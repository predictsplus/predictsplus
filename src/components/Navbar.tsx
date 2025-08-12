import { useEffect, useState } from "react";
import { Button, Layout } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/gifs/predictplus.gif";
import coin from "../assets/logo/logo.png";
import { BiLogOut } from "react-icons/bi";
import { useUser } from "../contexts/UserContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { user } = useUser();
  const [animateBounce, setAnimateBounce] = useState(false);

  useEffect(() => {
    if (user?.ppoints !== undefined) {
      setAnimateBounce("bounceOut");
      const timeout1 = setTimeout(() => {
        setAnimateBounce("bounceIn");
      }, 300);

      const timeout2 = setTimeout(() => {
        setAnimateBounce(false);
      }, 600);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
  }, [user?.ppoints]);


  return (
    <Layout.Header className="flex justify-between items-center bg-bg1 text-white px-2 shadow-gray-800 shadow-sm animate-fade">
      <div className="flex flex-grow text-xl font-bold cursor-pointer gap-2 my-auto">
        <img alt="logo" src={logo} className="h-8 ml-4 mt-[-4px] " />
        <p
          className={`bg-bg2 border-none text-white text-xs my-auto p-2 rounded-lg flex ${animateBounce === "bounceIn"
              ? "animate-bounceIn"
              : animateBounce === "bounceOut"
                ? "animate-bounceOut"
                : ""
            }`}
        >
          <img src={coin} alt="pp" className="h-4 mr-1" /> {user?.ppoints}
        </p>
      </div>
      {isAuthenticated && (
        <Button
          className="bg-bg2 border-none text-white"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <BiLogOut />
        </Button>
      )}
    </Layout.Header>
  );
};

export default Navbar;
