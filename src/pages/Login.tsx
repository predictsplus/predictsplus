import { Button, Input } from "antd";
import { MailOutlined, LockOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from '../assets/gifs/predictplus.gif';
import { useAuth } from "../contexts/AuthContext.tsx";
import Loader from "../components/Loader.tsx";
import { useState } from "react";
import { CNAME } from "../utils/constants.ts";

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login();
      navigate("/");
    }, 1000);
  };
  return (
    <div className="min-h-screen bg-bg1 text-gray-200 flex flex-col items-center justify-center relative">
      {loading && (
        <div className="absolute inset-0 bg-bg1 bg-opacity-80 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      <img src={logo} alt="logo" className="h-10 mb-5" />
      <div className="w-full max-w-xs">
        <Input
          size="large"
          prefix={<MailOutlined />}
          placeholder="Enter your username"
          className="mb-4 rounded-full bg-bg2 text-gray-600 border-gray-700"
        />
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          placeholder="Enter your password"
          className="mb-6 rounded-full bg-bg2 text-gray-600 border-gray-700"
        />
        <div className="flex justify-center mb-1 text-sm text-gray-400 hover:underline cursor-pointer">
          Need help?
        </div>
        <div
          className="flex justify-center mb-6 text-gray-400 hover:underline cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </div>
        <Button
          icon={<ArrowRightOutlined />}
          size="large"
          onClick={handleLogin}
          className="bg-pBlue min-w-full rounded-full border-none text-white"
          disabled={loading}
        >Sign-In</Button>

        <p className="text-xs text-gray-500 text-center mt-8">
          © {CNAME} {new Date().getFullYear()} &nbsp;|&nbsp; Play at your own risk. It’s addictive. Subject to risks.
        </p>
      </div>
    </div>
  );
};

export default Login;
