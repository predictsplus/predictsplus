import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Profile from "./pages/Profile.tsx";
import LiveBet from "./pages/LiveBet.tsx";
import Navbar from "./components/Navbar.tsx";
import Casino from "./pages/Casino.tsx";
import Register from "./pages/Register.tsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout className="min-h-screen bg-bg1">
          <Layout.Content>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Navbar />
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/live" element={<ProtectedRoute><Navbar /><LiveBet /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Navbar /><Profile /></ProtectedRoute>} />
              <Route path="/casino" element={<ProtectedRoute><Navbar /><Casino /></ProtectedRoute>} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Layout.Content>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
