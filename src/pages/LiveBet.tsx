import { useState, useEffect } from "react";
import FooterNav from "../components/FooterNav";
import { core_services } from "../utils/api";
import { useUser } from "../contexts/UserContext";

const LiveBet = () => {
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser()

  useEffect(() => {
    const fetchBets = async () => {
      try {
        setLoading(true);
        const data = await core_services.getAllBetsByUser({ userId: user?.id || "" });
        setBets(data);
      } catch (err) {
        console.error("Error fetching bets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, [user?.id]);

  return (
    <div className="text-white text-center mt-10 mx-auto animate-fade">
      <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        My Bets
      </h2>

      <div className="px-4 py-3 @container">
        <div className="flex overflow-hidden rounded-xl border border-[#3b4854] bg-[#111518]">
          <table className="flex-1 text-left">
            <thead>
              <tr className="bg-[#1b2127]">
                <th className="px-4 py-3 text-white text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-white text-sm font-medium">Event</th>
                <th className="px-4 py-3 text-white text-sm font-medium">Amount</th>
                <th className="px-4 py-3 text-white text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400">
                    Loading bets...
                  </td>
                </tr>
              ) : bets.length > 0 ? (
                bets.map((bet: any, index: number) => (
                  <tr key={index} className="border-t border-t-[#3b4854]">
                    <td className="h-[72px] px-4 py-2 text-[#9cabba] text-sm">
                      {new Date(bet.createdAt).toLocaleDateString()}
                    </td>
                    <td className="h-[72px] px-4 py-2 text-[#9cabba] text-sm">{bet.eventName}</td>
                    <td className="h-[72px] px-4 py-2 text-[#9cabba] text-sm">₹ {bet.amount}</td>
                    <td className="h-[72px] px-4 py-2 text-sm">
                      <button
                        className={`flex items-center justify-start rounded-full h-8 px-4 text-sm ${bet.status === "Won"
                            ? "bg-green-500 text-white"
                            : bet.status === "Lost"
                              ? "bg-red-500 text-white"
                              : "bg-[#283139] text-white"
                          }`}
                      >
                        <span className="truncate">{bet.status}</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400">
                    No bets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <FooterNav />
    </div>
  );
};
export default LiveBet;