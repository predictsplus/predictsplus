import { FaDice, FaSuitcase, FaUser } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

const FooterNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 w-full mx-auto bg-[#1a1a1a] p-2 flex justify-around rounded-t-xl text-white z-50">
      <span
        onClick={() => navigate("/")}
        className={`flex flex-col items-center justify-center gap-1 text-xl cursor-pointer ${location.pathname === "/" ? "text-pBlue" : ""}`}
      >
        <IoMdHome />
        <p className="text-xs font-medium">Home</p>
      </span>

      <span
        onClick={() => navigate("/live")}
        className={`flex flex-col items-center justify-center gap-1 text-xl cursor-pointer ${location.pathname === "/live" ? "text-pBlue" : ""}`}
      >
        <FaSuitcase />
        <p className="text-xs font-medium">My Orders</p>
      </span>

      <span
        onClick={() => navigate("/casino")}
        className={`flex flex-col items-center justify-center gap-1 text-xl cursor-pointer ${location.pathname === "/casino" ? "text-pBlue" : ""}`}
      >
        <FaDice />
        <p className="text-xs font-medium">Casino</p>
      </span>

      <span
        onClick={() => navigate("/profile")}
        className={`flex flex-col items-center justify-center gap-1 text-xl cursor-pointer ${location.pathname === "/profile" ? "text-pBlue" : ""}`}
      >
        <FaUser />
        <p className="text-xs font-medium">Profile</p>
      </span>
    </footer>
  );
};

export default FooterNav;
