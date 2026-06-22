import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStore } from "@/store/useStore";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import AuthOverlay from "@/components/AuthOverlay";

export default function App() {
  const currentUser = useStore((state) => state.currentUser);

  if (!currentUser) {
    return <AuthOverlay />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
