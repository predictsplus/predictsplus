import { Button, Input } from "antd";
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import { useState } from "react";
import Loader from "../components/Loader.tsx";
import { CNAME } from "../utils/constants.ts";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-bg1 text-gray-200 flex flex-col items-center justify-center relative">
      {loading && (
        <div className="absolute inset-0 bg-bg1 bg-opacity-80 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      <img src={logo} alt="logo" className="h-10 mb-2 rounded-full" />
      <h1 className="text-3xl font-bold mb-3">{CNAME}</h1>

      <div className="w-full max-w-xs text-left">
        <label className="text-sm ml-2 mb-1 inline-block">
          Full Name <span className="text-red-500">*</span>
        </label>
        <Input
          size="large"
          prefix={<UserOutlined />}
          placeholder="Full Name"
          className="mb-4 rounded-full bg-bg2 text-gray-600 border-gray-700"
        />

        <label className="text-sm ml-2 mb-1 inline-block">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          size="large"
          prefix={<MailOutlined />}
          placeholder="Email"
          className="mb-4 rounded-full bg-bg2 text-gray-600 border-gray-700"
        />

        <label className="text-sm ml-2 mb-1 inline-block">Mobile Number</label>
        <Input
          size="large"
          prefix={<span className="text-gray-500 text-xs pl-1">+91</span>}
          placeholder="Mobile Number"
          type="tel"
          maxLength={10}
          className="mb-4 rounded-full bg-bg2 text-gray-600 border-gray-700"
        />

        <label className="text-sm ml-2 mb-1 inline-block">
          Password <span className="text-red-500">*</span>
        </label>
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          placeholder="Create a password"
          className="mb-4 rounded-full bg-bg2 text-gray-600 border-gray-700"
        />

        <label className="text-sm ml-2 mb-1 inline-block">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <Input.Password
          size="large"
          prefix={<LockOutlined />}
          placeholder="Confirm password"
          className="mb-6 rounded-full bg-bg2 text-gray-600 border-gray-700"
        />

        <Button
          icon={<ArrowRightOutlined />}
          size="large"
          onClick={handleRegister}
          className="bg-pBlue min-w-full rounded-full border-none text-white"
          disabled={loading}
        >
          Create Account
        </Button>

        <div className="flex justify-center mt-6 text-sm text-gray-400">
          <span
            className="hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </span>
        </div>

        <p className="text-xs text-gray-500 text-center mt-8">
          © {CNAME} {new Date().getFullYear()} &nbsp;|&nbsp; Play responsibly.
          Subject to risk.
        </p>
      </div>
    </div>
  );
};

export default Register;
