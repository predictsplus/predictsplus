import { useState, useEffect } from "react";
import FooterNav from "../components/FooterNav";
import SpaceConsolidation from '../components/SpaceAdjust';
import BetPopup from "../components/BetPopup";
import { AnimatePresence } from "framer-motion";
import rolling from '../assets/images/rolling.png';
import coin from '../assets/images/coin.jpeg';
import { useNavigate } from "react-router-dom";
import { core_services } from "../utils/api";
import Loader from "../components/Loader";
import LiveEventCard from "../components/LiveEventCard";
import UpcomingEventCard from "../components/UpcomingEventCard";
import { Helmet } from "react-helmet-async";

const casinoHighlights = [
  { id: 1, title: "Slot Rolling", image: rolling },
  { id: 2, title: "Flip Coin", image: coin },
];

const Home = () => {
  const [liveEvents, setliveEvents] = useState<any[]>([]);
  const [upcomingEvents, setupcomingEvents] = useState<any[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [showBetPopup, setShowBetPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showAllLive, setShowAllLive] = useState(false);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const navigateToCasino = () => navigate('/casino');

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const res = await core_services.getPredictPlusMatches();
        const matches = (res.data || []).filter((m: any) => m.ms?.toLowerCase() !== "result");

        const live = matches.filter((m: any) =>
          m.status?.toLowerCase().includes("live") || m.t1s || m.t2s
        );

        const upcoming = matches.filter((m: any) =>
          m.status?.toLowerCase().includes("match not started") ||
          m.status?.toLowerCase().includes("fixture")
        );

        setliveEvents(live);
        setupcomingEvents(upcoming);
      } catch (err) {
        console.error("Failed to fetch matches:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const filterMatches = (matches: any[]) => {
    if (!searchQuery.trim()) return matches;
    return matches.filter((m) =>
      `${m.t1} ${m.t2} ${m.series}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const displayedliveEvents = showAllLive
    ? filterMatches(liveEvents)
    : filterMatches(liveEvents).slice(0, 8);

  const displayedupcomingEvents = showAllUpcoming
    ? filterMatches(upcomingEvents)
    : filterMatches(upcomingEvents).slice(0, 8);

  return (
    <div className="text-white mx-auto bg-bg1 animate-fade">
       <Helmet>
        <title>PredictsPlus - Opinion Trading & Casino</title>
        <meta name="description" content="Trade on Cricket, Football, tomorrow's market trends, play exciting casino games like dice & coin toss, and win real rewards on PredictsPlus." />
        <meta property="og:title" content="PredictsPlus - Opinion Trading & Casino" />
        <meta property="og:description" content="Join PredictsPlus and trade on future events or play casino games to win big." />
        <meta property="og:url" content="https://www.predictsplus.com/" />
        <meta property="og:type" content="website" />
      </Helmet>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
          <Loader />
        </div>
      )}

      <div className="m-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 pl-5 rounded-full bg-white/10 text-sm text-white outline-none placeholder:pl-1"
        />
      </div>
      <section className="pt-4 m-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Live Event</h2>
        <div className="grid gap-4 md:grid-cols-4 live-card-col">
          {displayedliveEvents.length > 0 ? (
            displayedliveEvents.map((match) => (
              <LiveEventCard
                match={{
                  id: match.id,
                  teamA: match.t1,
                  teamB: match.t2,
                  score: `${match.t1s || ""} ${match.t2s ? " / " + match.t2s : ""}`,
                  status: match.status,
                  teamAImg: match.t1img,
                  teamBImg: match.t2img,
                  series: match.series,
                  dateTimeGMT: match.dateTimeGMT
                }}
                setSelectedMatch={setSelectedMatch}
                setShowBetPopup={setShowBetPopup}
              />
            ))
          ) : (
            <p className="text-gray-400">No live Events available</p>
          )}
        </div>
        {filterMatches(liveEvents).length > 10 && (
          <button
            onClick={() => setShowAllLive(!showAllLive)}
            className="mt-4 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20"
          >
            {showAllLive ? "Show Less" : "Show More"}
          </button>
        )}
      </section>
      <section className="mt-6 m-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Upcoming Events</h2>
        <div className="grid gap-4 md:grid-cols-4 upcoming-card-col">
          {displayedupcomingEvents?.length > 0 ? (
            displayedupcomingEvents?.map((match) => (
              <UpcomingEventCard
                match={{
                  id: match.id,
                  teamA: match.t1,
                  teamB: match.t2,
                  dateTimeGMT: match.dateTimeGMT,
                  series: match.series,
                  teamAImg: match.t1img,
                  teamBImg: match.t2img,
                  status: match.status
                }}
              />
            ))
          ) : (
            <p className="text-gray-400">No upcoming Events available</p>
          )}
        </div>
        {filterMatches(upcomingEvents).length > 10 && (
          <button
            onClick={() => setShowAllUpcoming(!showAllUpcoming)}
            className="mt-4 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20"
          >
            {showAllUpcoming ? "Show Less" : "Show More"}
          </button>
        )}
      </section>
      {selectedMatch && (
        <div className="mt-8 bg-[#111] p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Event Details</h3>
          <p>{selectedMatch.teamA} vs {selectedMatch.teamB}</p>
          {selectedMatch.score && (
            <p className="text-sm text-gray-400">Live Score: {selectedMatch.score}</p>
          )}
        </div>
      )}
      <section className="mt-6 m-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Casino Highlights</h2>
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
