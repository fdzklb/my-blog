"use client";

import { useEffect, useId } from "react";
import { usePathname } from "next/navigation";
import { fetchUrl } from "@/lib/utils";

const RouteTracker = ({}) => {
  const pathname = usePathname();

  const trackId = useId()
  const setPathnames = (info: { pathname: string, timestamp: string }) => {
    const pathnames = JSON.parse(sessionStorage.getItem("pathnames") || "[]");
    if(pathnames.length > 0 && pathnames[pathnames.length - 1].pathname === info.pathname) {
      return;
    } else {
      pathnames.push(info);
      sessionStorage.setItem("pathnames", JSON.stringify(pathnames));
    }
  }

  useEffect(() => {
    setPathnames({
      pathname,
      timestamp: new Date().toISOString(),
    });
  }, [pathname]);

  // Beacon 发送方法
  const sendExitData = () => {
    if (navigator.sendBeacon) {
      navigator.sendBeacon( `${fetchUrl}/routeTrack`, JSON.stringify({ trackId, records: sessionStorage.getItem("pathnames") }));
    }
  };
  
  // const handleVisibilityChange = () => {
  //   if (document.visibilityState === 'hidden') {
  //     sendExitData();
  //   }
  // };

  useEffect(() => {
    // const events = ['pagehide', 'beforeunload', 'visibilitychange'];
    const events = ['beforeunload'];

    // 注册事件监听
    events.forEach(event => {
      window.addEventListener(event, sendExitData);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, sendExitData);
      });
    };
  }, []);

  return null;
};

export default RouteTracker;