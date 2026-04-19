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
      whileHover={{ scale: 1.05, boxShadow: '0 8px 30px var(--accent-glow)' }}
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
        background: 'var(--nav-bg)',
        backdropFilter: isMobile ? 'blur(18px)' : 'blur(12px)',
        WebkitBackdropFilter: isMobile ? 'blur(18px)' : 'blur(12px)',
        border: '1px solid var(--nav-border)',
        color: 'var(--accent)',
        fontFamily: 'inherit',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 4px 20px var(--nav-shadow)',
        transition: 'top 0.3s ease, bottom 0.3s ease, left 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
        outline: 'none',
      }}
    >
      <Calendar size={20} strokeWidth={2.5} />
    </motion.button>
  );
};

export default CalWidget;
