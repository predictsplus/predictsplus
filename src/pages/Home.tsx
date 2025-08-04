import { Button } from "antd";
import Card from "antd/es/card/Card";
import { useState } from "react";
import FooterNav from "../components/FooterNav.tsx";
import SpaceConsolidation from '../components/SpaceAdjust.tsx'
import BetPopup from "../components/BetPopup.tsx";
import { AnimatePresence } from "framer-motion";
import rolling from '../assets/images/rolling.png'
import coin from '../assets/images/coin.jpeg'
import { useNavigate } from "react-router-dom";

const liveMatches = [
  { id: 1, teamA: "India", teamB: "Australia", score: "132/2 (15.3)", status: "Live" },
  { id: 2, teamA: "England", teamB: "Pakistan", score: "98/4 (13.0)", status: "Live" },
  { id: 2, teamA: "New Zealand", teamB: "West Indies", score: "22/4 (12.0)", status: "Stopped Due to Rain" },
];

const upcomingMatches = [
  { id: 3, teamA: "India", teamB: "South Africa", time: "Today, 7:00 PM" },
  { id: 4, teamA: "Sri Lanka", teamB: "New Zealand", time: "Tomorrow, 3:30 PM" },
];
const casinoHighlights = [
  { id: 1, title: "Slot Rolling", image: rolling },
  { id: 2, title: "Flip Coin", image: coin },
];

const Home = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showBetPopup, setShowBetPopup] = useState(false);
  const navigate = useNavigate()
  const navigateToCasino = () => {
    navigate('/casino')
  }
  return (
    <div className="text-white mx-auto bg-bg1 animate-fade">
      <section className="pt-4 m-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">🏏 Live Matches</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {liveMatches.map((match) => (
            <Card
              key={match.id}
              className="bg-white/10 backdrop-blur-md border border-white/20 shadow-md text-white rounded-xl cursor-pointer"
              onClick={() => setSelectedMatch(match)}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-bold text-lg">{match.teamA} vs {match.teamB}</div>
                  <div className="text-sm text-gray-400">{match.score}</div>
                  <span className={`text-xs ${match?.status === 'Live' ? 'text-green-400' : 'text-orange-500'}`}>{match?.status}</span>
                </div>
                <Button
                  type="primary"
                  className="bg-pBlue rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMatch(match);
                    setShowBetPopup(true);
                  }}
                >
                  Place Bet
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-6 m-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">📅 Upcoming Matches</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {upcomingMatches.map((match) => (
            <Card key={match.id} className="bg-white/10 backdrop-blur-md border border-white/20 shadow-md text-white rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-bold text-lg">{match.teamA} vs {match.teamB}</div>
                  <div className="text-sm text-gray-400">{match.time}</div>
                </div>
                <Button type="default" className="rounded-full bg-pBlue border-none text-white">
                  Set Reminder
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {selectedMatch && (
        <div className="mt-8 bg-[#111] p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Match Details</h3>
          <p>{selectedMatch.teamA} vs {selectedMatch.teamB}</p>
          <p className="text-sm text-gray-400">Live Score: {selectedMatch.score}</p>
        </div>
      )}
      <section className="mt-6 m-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">🎰 Casino Highlights</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {casinoHighlights.map((casino) => (
            <div
              key={casino.id}
              className="bg-white/10 rounded-xl overflow-hidden shadow-md transition duration-300 transform hover:scale-105 hover:cursor-pointer"
              onClick={navigateToCasino}
            >
              <img src={casino.image} alt={casino.title} className="h-28 w-full object-cover" />
              <div className="p-2 text-sm font-medium text-center">{casino.title}</div>
            </div>
          ))}
        </div>
      </section>
      <SpaceConsolidation />
      <FooterNav />
      <AnimatePresence>
        {showBetPopup && (
          <BetPopup
            match={selectedMatch}
            onClose={() => setShowBetPopup(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
