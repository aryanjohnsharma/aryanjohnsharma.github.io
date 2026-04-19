import { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import playPressSound from "../utils/playPressSound";

const CalWidget = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"15min"});
      cal("ui", {"hideEventTypeDetails":true,"layout":"month_view"});
    })();
  }, []);

  return (
    <motion.button
      aria-label="Let's Talk"
      onClick={playPressSound}
      data-cal-namespace="15min"
      data-cal-link="aryan-sharma-amw1me/15min"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(255, 106, 0, 0.2)' }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed',
        top: isMobile ? 'max(1rem, env(safe-area-inset-top))' : 'auto',
        bottom: isMobile ? 'auto' : '1.5rem',
        left: isMobile ? 'calc(max(1rem, env(safe-area-inset-left)) + 52px)' : '1.5rem',
        zIndex: isMobile ? 110 : 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: isMobile ? '42px' : '54px',
        height: isMobile ? '42px' : '54px',
        padding: '0',
        borderRadius: isMobile ? '9999px' : '0',
        background: isMobile ? 'var(--nav-bg)' : 'rgba(10, 10, 10, 0.8)',
        backdropFilter: isMobile ? 'blur(18px)' : 'blur(12px)',
        WebkitBackdropFilter: isMobile ? 'blur(18px)' : 'blur(12px)',
        border: isMobile ? '1px solid var(--nav-border)' : '1px solid rgba(255, 106, 0, 0.3)',
        color: '#FF6A00',
        fontFamily: 'inherit',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: isMobile ? '0 4px 20px var(--nav-shadow)' : '0 4px 15px rgba(0, 0, 0, 0.3)',
        transition: 'top 0.3s ease, bottom 0.3s ease, left 0.3s ease',
        outline: 'none',
      }}
    >
      <Calendar size={20} strokeWidth={2.5} />
    </motion.button>
  );
};

export default CalWidget;
