import { useState, useEffect, useRef } from "react";
import FooterNav from "../components/FooterNav.tsx";
import { Button } from "antd";
import { motion } from "framer-motion";
import rollingSound from "../assets/sounds/rolling.mp3";
import win from "../assets/sounds/win.mp3";

const participants = [
  "Aniket", "Apoorv", "Karan", "Sneh", "Aviral",
  "Piyush", "Meet", "Anuj", "Priyansh", "Pushkar"
];

const rewards = [400, 300, 200];

const getWinners = () => {
  const shuffled = [...participants].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

const Casino = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winners, setWinners] = useState(null);
  const [rotation, setRotation] = useState(0);
  const audioRef: any = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(rollingSound);
    audioRef.current1 = new Audio(win);
    audioRef.current.volume = 0.3;
    audioRef.current1.volume = 0.2;
  }, []);

  const startSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinners(null);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    const newRotation = rotation + 1440 + Math.floor(Math.random() * 360);
    setRotation(newRotation);

    setTimeout(() => {
      const win = getWinners();
      setWinners(win);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current1.play()
      }
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-bg1 text-white text-center pt-5">
      <h1 className="text-2xl font-bold mb-2">🎰 Casino Wheel Game</h1>
      <p className="text-gray-400 mb-4">Spin the wheel! Top 3 (Out of 10 Participants) win cash prizes.</p>

      <motion.div
        animate={{ rotate: rotation }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="w-64 h-64 rounded-full border-8 border-pBlue border-dashed mx-auto flex items-center justify-center mb-6"
      >
        <span className="text-lg font-semibold">🎡</span>
      </motion.div>

      <Button
        type="primary"
        className="bg-pBlue text-white px-6 py-2 rounded-full"
        onClick={startSpin}
        disabled={isSpinning}
      >
        {isSpinning ? "Spinning..." : "Spin Now for 100"}
      </Button>

      <div className="mt-6 bg-white/5 backdrop-blur-md p-4 rounded-xl mx-4 text-center">
        <div className="flex flex-wrap justify-center gap-4">
          {participants.map((name, index) => {
            const isWinner = winners?.includes(name);
            const rewardIndex = winners?.indexOf(name);
            const prize = isWinner ? rewards[rewardIndex] : null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className={`w-20 h-20 flex flex-col items-center justify-center rounded-full text-xs font-semibold shadow-md px-1 ${isWinner !== undefined
                  ? isWinner
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-200"
                  }`}
              >
                <div>{name}</div>
                {prize && <div className="text-[10px] font-normal mt-1">₹{prize}</div>}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-6 px-6">
        10 participants. Only top 3 win! Others lose their entry. Play at your own risk.
      </div>

      <FooterNav />
    </div>
  );
};

export default Casino;
