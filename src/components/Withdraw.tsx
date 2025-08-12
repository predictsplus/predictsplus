import { Button, Input } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNotification } from "../contexts/NotificationContext";
import { useUser } from "../contexts/UserContext";
import { core_services } from "../utils/api";
import Loader from './Loader'
const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modalVariants = {
    hidden: { y: "100%" },
    visible: { y: 0 },
};

const Withdraw = ({ onClose, onWithdrawSuccess }: { onClose: () => void; onWithdrawSuccess: () => void }) => {
    const [ppoints, setPPoints] = useState(1);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();
    const { refreshUserFromCurrentToken, user } = useUser();

    const handleInputChange = (e: any) => {
        const value = Number(e.target.value);
        setPPoints(value >= 0 ? value : 0);
    };

    const handleWithdraw = async () => {
        if (ppoints <= 0) {
            showNotification("Error", "Ppoints must be greater than 0", "error");
            return;
        }

        setLoading(true);
        try {
            await core_services.withdrawAmount({ ppoints });
            await refreshUserFromCurrentToken();
            if (onWithdrawSuccess) {
                onWithdrawSuccess();
            }
            showNotification("Success", `₹${ppoints} withdrawn successfully!`, "success");
            onClose();
        } catch (error: any) {
            showNotification("Error", error.message || "Withdrawal failed", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm"
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
                    <h2 className="text-xl font-semibold">Withdraw Funds</h2>
                    <button onClick={onClose} className="text-white hover:text-red-400">✕</button>
                </div>
                <p className="text-sm text-gray-400 mb-2">Enter ppoints to withdraw:</p>
                <Input
                    value={ppoints}
                    onChange={handleInputChange}
                    type="number"
                    disabled={loading}
                    className="bg-white/10 text-white border-none mb-1 focus:!bg-white/10 hover:!bg-white/10"
                />
                {user?.conversion_ratio && user.conversion_ratio !== 0 && (
                    <p className="text-sm text-gray-400 mb-4">
                        You will get <span className="font-semibold text-green-500">₹{(ppoints / user.conversion_ratio).toFixed(2)}</span> while you withdraw <span className="text-points font-semibold">{ppoints} Points</span>
                    </p>
                )}
                <Button
                    className={`w-full ${loading ? 'bg-bg1' : 'bg-pBlue'} text-white py-2 rounded-xl border-none flex items-center justify-center`}
                    onClick={handleWithdraw}
                >
                    {loading ? <Loader /> : <>Withdraw {ppoints}</>}
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default Withdraw;
