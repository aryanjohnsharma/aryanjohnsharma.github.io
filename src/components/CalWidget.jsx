import { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

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
      data-cal-namespace="15min"
      data-cal-link="aryan-sharma-amw1me/15min"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(255, 106, 0, 0.2)' }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed',
        bottom: isMobile ? '6rem' : '1.5rem',
        left: '1.5rem',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.75rem 1.2rem',
        borderRadius: '0',
        background: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 106, 0, 0.3)',
        color: '#FF6A00',
        fontFamily: 'inherit',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        transition: 'bottom 0.3s ease',
        outline: 'none',
      }}
    >
      <Calendar size={18} strokeWidth={2.5} />
      <span>Let's Talk</span>
    </motion.button>
  );
};

export default CalWidget;

