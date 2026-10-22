import "@/App.css";
import './experience.css';
import './peach.css';
import './edition5.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import Landing from "@/pages/Landing";
import ThankYou from "@/pages/ThankYou";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import { PageProvider } from './context/PageContext';
import { ConsultationProvider } from './context/ConsultationContext';

function App() {
  const reduced = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user"><ReactLenis root options={{ lerp: 0.09, smoothWheel: !reduced, anchors: { offset: -85 } }}>
      <div className="App">
        <BrowserRouter>
          <PageProvider><ConsultationProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/siddha-mala.html" element={<Landing />} />
            <Route path="/siddha-mala/thankyou.html" element={<ThankYou />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          </ConsultationProvider></PageProvider>
        </BrowserRouter>
        <Toaster theme="light" position="top-center" />
      </div>
    </ReactLenis></MotionConfig>
  );
}

export default App;
