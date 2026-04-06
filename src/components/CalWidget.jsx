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
  }, []);

  return null;
};

export default CalWidget;
