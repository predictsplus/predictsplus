import { useState, useEffect } from "react";
import FooterNav from "../components/FooterNav.tsx";

const LiveBet = () => {
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newProfit = profit + (Math.random() * 100 - 50);
      setProfit(parseFloat(newProfit.toFixed(2)));
    }, 500);

    return () => clearInterval(interval);
  }, [profit]);

  return (
    <div className="text-white text-center mt-10 mx-auto animate-fade">
      <h2 className="text-xl font-bold mb-4">Live Bets</h2>
      <div className="text-4xl font-bold text-green-400">
        ₹ {profit > 0 ? "+" : ""}{profit}
      </div>
      <p className="text-sm text-gray-400 mt-2">Real-time Profit / Loss</p>

      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Betting History</h2>
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
              {[
                {
                  date: "2024-07-20",
                  event: "India vs. Australia",
                  amount: "$100",
                  status: "Won",
                },
                {
                  date: "2024-07-15",
                  event: "England vs. New Zealand",
                  amount: "$50",
                  status: "Lost",
                },
                {
                  date: "2024-07-10",
                  event: "South Africa vs. Pakistan",
                  amount: "$75",
                  status: "Lost",
                },
                {
                  date: "2024-07-05",
                  event: "West Indies vs. Sri Lanka",
                  amount: "$25",
                  status: "Won",
                },
                {
                  date: "2024-06-30",
                  event: "Bangladesh vs. Afghanistan",
                  amount: "$120",
                  status: "Lost",
                },
              ].map((bet, index) => (
                <tr key={index} className="border-t border-t-[#3b4854]">
                  <td className="h-[72px] px-4 py-2 text-[#9cabba] text-sm">{bet.date}</td>
                  <td className="h-[72px] px-4 py-2 text-[#9cabba] text-sm">{bet.event}</td>
                  <td className="h-[72px] px-4 py-2 text-[#9cabba] text-sm">{bet.amount}</td>
                  <td className="h-[72px] px-4 py-2 text-sm">
                    <button className="flex items-center justify-start rounded-full h-8 px-4 bg-[#283139] text-white text-sm">
                      <span className="truncate">{bet.status}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <FooterNav />
    </div>
  );
};

export default LiveBet;