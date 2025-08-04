import { Button, Input } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modalVariants = {
    hidden: { y: "100%" },
    visible: { y: 0 },
};

const BetPopup = ({ match, onClose }: { match: any; onClose: () => void }) => {
    const [selected, setSelected] = useState<null | string>(null);
    const [amount, setAmount] = useState(100);
    const [balance, setBalance] = useState(1000);

    if (!match) return null;

    const handleAmountChange = (delta: number) => {
        setAmount((prev) => {
            const updated = prev + delta;
            if (updated < 0) return 0;
            if (updated > balance) return balance;
            return updated;
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value <= balance) {
            setAmount(value >= 0 ? value : 0);
        }
    };


    const getOdds = (team: string) => {
        return team === match.teamA ? 1.85 : 2.1;
    };

    const handlePlaceBet = () => {
        if (!selected || amount === 0) return;
        if (amount > balance) {
            alert("Insufficient balance");
            return;
        }

        const odds = getOdds(selected);
        const winnings = +(amount * odds).toFixed(2);
        const newBalance = balance - amount;

        alert(
            `Bet placed on ${selected} for ₹${amount}. Potential win: ₹${winnings}`
        );

        setBalance(newBalance);
        onClose();
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={onClose}
        >
            <motion.div
                className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] p-6 rounded-t-2xl shadow-lg text-white"
                variants={modalVariants}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Place Bet</h2>
                        <p className="text-sm text-gray-400">
                            {match.teamA} vs {match.teamB}
                        </p>
                        <p className="text-xs text-gray-500">Match starts in 2 hours</p>
                    </div>
                    <button onClick={onClose} className="text-white p-1 hover:text-red-400">
                        ✕
                    </button>
                </div>
                <div className="space-y-3">
                    {[{ team: match.teamA, odds: 1.85 }, { team: match.teamB, odds: 2.1 }].map(
                        ({ team, odds }) => (
                            <div
                                key={team}
                                className={`flex justify-between items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${selected === team
                                    ? "bg-pBlue text-white"
                                    : "bg-white/10 hover:bg-white/20"
                                    }`}
                                onClick={() => setSelected(team)}
                            >
                                <div className="font-semibold">{team}</div>
                                <span className="bg-white/20 px-3 py-1 rounded-lg">{odds}</span>
                            </div>
                        )
                    )}
                </div>
                {selected && (
                    <>
                        <div className="mt-6">
                            <label className="block mb-1">Amount</label>
                            <div className="flex items-center gap-2">
                                <Button onClick={() => handleAmountChange(-100)} className="bg-white/10 border-none text-white">-</Button>
                                <Input
                                    value={amount}
                                    onChange={handleInputChange}
                                    type="number"
                                    min={0}
                                    max={balance}
                                    className="w-24 text-center bg-white/10 text-white border-none hover:bg-white/10 focus:!bg-white/10 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    style={{ MozAppearance: 'textfield' }}
                                />
                                <Button onClick={() => handleAmountChange(100)} className="bg-white/10 border-none text-white">+</Button>
                            </div>

                        </div>
                        <div className="mt-4 text-green-400 font-medium text-sm">
                            Potential Win: ₹{(amount * getOdds(selected)).toFixed(2)}
                        </div>
                        <div className="mt-2 text-xs text-gray-400">
                            Current Balance: ₹{balance}
                        </div>
                    </>
                )}
                {selected && <Button
                    className="w-full mt-6 bg-pBlue text-white text-md py-2 rounded-xl border-none"
                    onClick={handlePlaceBet}
                >
                    Place Bet
                </Button>}
            </motion.div>
        </motion.div>
    );
};

export default BetPopup;
