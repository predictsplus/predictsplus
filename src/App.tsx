import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import LiveBet from "./pages/LiveBet";
import Navbar from "./components/Navbar";
import Casino from "./pages/Casino";
import Register from "./pages/Register";
import { NotificationProvider } from "./contexts/NotificationContext";
import '../src/utils/css/custom.css'
import { UserProvider } from "./contexts/UserContext";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <NotificationProvider>
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
        </NotificationProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
