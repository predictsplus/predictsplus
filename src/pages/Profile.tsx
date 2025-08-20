import { useState, useEffect } from "react";
import { Button } from "antd";
import FooterNav from "../components/FooterNav";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import Withdraw from "../components/Withdraw";
import Deposit from "../components/Deposit";
import { useUser } from "../contexts/UserContext";
import { core_services } from "../utils/api";
import logo from "../assets/logo/logo.png"
import EarnCoinsModal from "../components/EarnCoin";
import HistoryTable from "../components/HistoryTable";

const Profile = () => {
  const { user } = useUser()
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [historyTab, setHistoryTab] = useState(1);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isDepositLoading, setIsDepositLoading] = useState(true);
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(true);
  const [isEarnModalOpen, setIsEarnModalOpen] = useState(false);


  useEffect(() => {
    if (user) setIsUserLoading(false);
  }, [user]);


  const [depositHistory, setDepositHistory] = useState([]);
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const fetchDeposits = async () => {
    try {
      const res = await core_services.getDepositList();
      const formatted = res.map((entry: any) => ({
        amount: entry.amount,
        date: new Date(entry.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      }));
      setDepositHistory(formatted);
    } catch (err) {
      console.error("Failed to fetch deposit history", err);
    } finally {
      setIsDepositLoading(false);
    }
  };
  const fetchWithdrawals = async () => {
    try {
      const res = await core_services.getWithdrawList();
      const formatted = res.map((entry: any) => ({
        amount: entry.amount,
        date: new Date(entry.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      }));
      setWithdrawHistory(formatted);
    } catch (err) {
      console.error("Failed to fetch withdraw history", err);
    } finally {
      setIsWithdrawLoading(false);
    }
  };

  useEffect(() => {

    fetchDeposits();
    fetchWithdrawals();
  }, []);

  return (
    <>
      {isUserLoading ? (
        <div className="w-full bg-[#1c1f26] rounded-2xl p-6 shadow-xl animate-pulse">
          <div className="flex justify-between items-center">
            <div className="h-6 w-32 bg-bg3 rounded mb-2"></div>
            <div className="h-20 w-20 rounded-full bg-bg3"></div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center mt-6">
            <div className="bg-bg3 rounded-lg py-6"></div>
            <div className="bg-bg3 rounded-lg py-6"></div>
            <div className="bg-bg3 rounded-lg py-6"></div>
          </div>
          <div className="mt-6 h-8 w-40 bg-bg3 rounded"></div>
          <div className="mt-4 h-10 bg-bg3 rounded w-full"></div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-[#0e0e11] to-[#14161c] text-white px-4 pt-10 pb-24 flex flex-col items-center animate-fade">
          <div className="relative w-full bg-[#1c1f26] rounded-2xl p-6 shadow-xl">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <span className="text-sm text-gray-400">{user?.membershipLevel}</span>
              </div>
              <img
                src={user?.profilePicture || 'https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png'}
                className="h-20 w-20 rounded-full object-cover border-2 border-white"
                alt="Profile"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 text-center mt-6">
              <div className="bg-bg3 rounded-lg py-2">
                <p className="text-xs text-gray-400">Age</p>
                <p className="text-lg font-bold">{user?.age}</p>
              </div>
              <div className="bg-bg3 rounded-lg py-2">
                <p className="text-xs text-gray-400">Orders</p>
                <p className="text-lg font-bold">{user?.totalBets}</p>
              </div>
              <div className="bg-bg3 rounded-lg py-2">
                <p className="text-xs text-gray-400">Win %</p>
                <p className="text-lg font-bold">{user?.winPercentage}%</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">Current Balance</p>
              <div className="flex flex-wrap gap-3">
                <p className="text-2xl font-semibold text-white flex flex-wrap"><img src={logo} alt="pp" className="h-8 mr-1" /> {user?.ppoints}</p>
                <button
                  className="
    bg-bg3 text-yellow-300 border border-yellow-500 flex-1 flex items-center justify-center gap-1 max-w-[100px] rounded-full
    transition duration-200 ease-in-out transform
    hover:scale-110 hover:z-[100] hover:bg-bg1
  "
                  onClick={() => setIsEarnModalOpen(true)}
                >
                  Earn Coins
                </button>

              </div>
            </div>
            <div className="flex justify-between flex-wrap gap-3 mt-6">
              <Button
                className="bg-bg3 border-none text-white opacity-50 cursor-not-allowed flex-1 flex items-center justify-center gap-1"
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

            <div className="text-center text-xs text-gray-400 mt-2">
              As per Indian policy, no real money involved as of now
            </div>
            <div className="text-center text-sm text-blue-400 mt-4 underline cursor-pointer">
              Contact Customer Care
            </div>
          </div>

          {isWithdrawOpen && <Withdraw onClose={() => setIsWithdrawOpen(false)} onWithdrawSuccess={fetchWithdrawals} />}
          {isDepositOpen && <Deposit onClose={() => setIsDepositOpen(false)} onDepositSuccess={fetchDeposits} />}
          <HistoryTable
            historyTab={historyTab}
            setHistoryTab={setHistoryTab}
            depositHistory={depositHistory}
            withdrawHistory={withdrawHistory}
            isDepositLoading={isDepositLoading}
            isUserLoading={isUserLoading}
            isWithdrawLoading={isWithdrawLoading}
          />
        </div>
      )}
      <EarnCoinsModal
        visible={isEarnModalOpen}
        onClose={() => setIsEarnModalOpen(false)}
        onEarnSuccess={() => {
          fetchDeposits();
        }}
      />
      <FooterNav />
    </>)
};

export default Profile;
