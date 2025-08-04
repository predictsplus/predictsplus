import { useState } from "react";
import { Button, Modal, Input, Card } from "antd";
import FooterNav from "../components/FooterNav.tsx";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const Profile = () => {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [historyTab, setHistoryTab] = useState(1);

  const depositHistory = [
    { amount: 1000, date: "28 July 2025" },
    { amount: 500, date: "24 July 2025" },
  ];

  const withdrawHistory = [
    { amount: 700, date: "25 July 2025" },
    { amount: 300, date: "22 July 2025" },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0e0e11] to-[#14161c] text-white px-4 pt-10 pb-24 flex flex-col items-center animate-fade">
      <div className="relative w-full bg-[#1c1f26] rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Piyush Patel</h2>
            <span className="text-sm text-gray-400">Elite</span>
          </div>
          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQFQqR79XKhXtg/profile-displayphoto-shrink_400_400/B4DZbI3ybFHAAk-/0/1747126790844?e=1756944000&v=beta&t=X2xN9hd5nKmF0tv8-Y3B8My0o9hMhe_zoraNJ841feA"
            className="h-20 w-20 rounded-full object-cover border-2 border-white"
            alt="Profile"
          />
        </div>

        {/* Stats Boxes */}
        <div className="grid grid-cols-3 gap-3 text-center mt-6">
          <div className="bg-bg3 rounded-lg py-2">
            <p className="text-xs text-gray-400">Age</p>
            <p className="text-lg font-bold">24</p>
          </div>
          <div className="bg-bg3 rounded-lg py-2">
            <p className="text-xs text-gray-400">Bets</p>
            <p className="text-lg font-bold">25</p>
          </div>
          <div className="bg-bg3 rounded-lg py-2">
            <p className="text-xs text-gray-400">Win %</p>
            <p className="text-lg font-bold">62%</p>
          </div>
        </div>

        {/* Balance */}
        <div className="mt-6">
          <p className="text-sm text-gray-400">Current Balance</p>
          <p className="text-2xl font-semibold text-white">₹ 1,250</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between flex-wrap gap-3 mt-6">
          <Button
            className="bg-bg3 border-none text-white flex-1 flex items-center justify-center gap-1"
            onClick={() => setIsDepositOpen(true)}
          >
            <ArrowDownOutlined /> Deposit
          </Button>
          <Button
            className="bg-bg3 border-none text-white flex-1 flex items-center justify-center gap-1"
            onClick={() => setIsWithdrawOpen(true)}
          >
            <ArrowUpOutlined /> Withdraw
          </Button>
        </div>

        {/* Contact */}
        <div className="text-center text-sm text-blue-400 mt-4 underline cursor-pointer">
          Contact Customer Care
        </div>
      </div>

      {/* Modals */}
      <Modal
        title="Withdraw Funds"
        open={isWithdrawOpen}
        onCancel={() => setIsWithdrawOpen(false)}
        onOk={() => setIsWithdrawOpen(false)}
        okText="Withdraw"
      >
        <p>Enter amount to withdraw:</p>
        <Input placeholder="e.g., ₹500" className="mt-2" />
      </Modal>

      <Modal
        title="Deposit Funds"
        open={isDepositOpen}
        onCancel={() => setIsDepositOpen(false)}
        onOk={() => setIsDepositOpen(false)}
        okText="Deposit"
      >
        <p>Enter amount to deposit:</p>
        <Input placeholder="e.g., ₹1000" className="mt-2" />
      </Modal>
      {/* History */}
      <div className="w-full mt-8 text-center">
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl w-full mx-auto">
          {/* Tab Buttons */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setHistoryTab(1)}
              className={`px-4 py-1 rounded-full text-sm ${historyTab === 1 ? "bg-pBlue text-white" : "bg-white/10 text-gray-300"
                }`}
            >
              Deposit History
            </button>
            <button
              onClick={() => setHistoryTab(2)}
              className={`px-4 py-1 rounded-full text-sm ${historyTab === 2 ? "bg-pBlue text-white" : "bg-white/10 text-gray-300"
                }`}
            >
              Withdraw History
            </button>
          </div>

          {/* Table Format */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-gray-300 border-b border-white/10">
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {(historyTab === 1 ? depositHistory : withdrawHistory).map((entry, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="py-2 px-4 text-white">₹{entry.amount}</td>
                    <td className="py-2 px-4 text-gray-400">{entry.date}</td>
                  </tr>
                ))}
                {(historyTab === 1 ? depositHistory : withdrawHistory).length === 0 && (
                  <tr>
                    <td colSpan={2} className="py-4 text-center text-gray-400">
                      No transactions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <FooterNav />
    </div>
  );
};

export default Profile;
