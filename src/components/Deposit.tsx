import { Button, Input } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNotification } from "../contexts/NotificationContext.tsx";
import { core_services } from "../utils/api.ts";
import { useUser } from "../contexts/UserContext.tsx";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
};

const Deposit = ({ onClose, onDepositSuccess }: { onClose: () => void, onDepositSuccess: () => void }) => {
  const [amount, setAmount] = useState(1000);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const { refreshUserFromCurrentToken } = useUser();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAmount(value >= 0 ? value : 0);
  };

  const handleDeposit = async () => {
    if (amount <= 0) {
      showNotification("Error", "Amount must be greater than 0", "error");
      return;
    }

    setLoading(true);
    try {
      await core_services.depositAmount({ amount });
      await refreshUserFromCurrentToken()
      if (onDepositSuccess) {
        onDepositSuccess();
      }
      showNotification("Success", `₹${amount} deposited successfully!`, "success");
      onClose();
    } catch (error: any) {
      showNotification("Error", error.message || "Deposit failed", "error");
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
          <h2 className="text-xl font-semibold">Deposit Funds</h2>
          <button onClick={onClose} className="text-white hover:text-red-400">✕</button>
        </div>
        <p className="text-sm text-gray-400 mb-2">Enter amount to deposit:</p>
    <Input
  value={amount}
  onChange={handleInputChange}
  type="number"
  disabled={loading}
  className="bg-white/10 text-white border-none mb-4 focus:!bg-white/10 hover:!bg-white/10"
/>

        <Button
          className="w-full bg-pBlue text-white py-2 rounded-xl border-none"
          onClick={handleDeposit}
          loading={loading}
          disabled={loading}
        >
          Deposit ₹{amount}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Deposit;
