import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const CalWidget = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"15min"});
      cal("floatingButton", {
        "calLink":"aryan-sharma-amw1me/15min",
        "config":{
          "layout":"month_view",
          "useSlotsViewOnSmallScreen":"true"
        },
        "buttonText":"Schedule a Meet",
        "buttonColor":"#000000",
        "buttonTextColor":"#FF6A00",
        "buttonPosition":"bottom-left"
      });
      cal("ui", {"hideEventTypeDetails":true,"layout":"month_view"});
    })();

    // Reach inside the shadow DOM to fix mobile position
    const fixPosition = () => {
      const hosts = document.querySelectorAll("cal-floating-button");
      hosts.forEach((host) => {
        const shadow = host.shadowRoot;
        if (!shadow) return;
        const btn = shadow.querySelector("button");
        if (!btn) return;
        const isMobile = window.innerWidth < 768;
        btn.style.bottom = isMobile ? "6rem" : "";
        btn.style.transform = "scale(0.9)";
      });
    };

    const interval = setInterval(() => {
      const host = document.querySelector("cal-floating-button");
      if (host?.shadowRoot?.querySelector("button")) {
        clearInterval(interval);
        fixPosition();
        window.addEventListener("resize", fixPosition);
      }
    }, 300);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", fixPosition);
    };
  }, []);

  return null;
};

export default CalWidget;

