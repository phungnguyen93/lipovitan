import { useEffect, useState } from "react";

export const Breakpoints = {
  xs: 0,
  sm: 600,
  md: 1024,
  lg: 1280,
  xl: 1600,
};

const muteBrowser = (listener) => {
  if (typeof window != "undefined") {
    // console.log("clean up", listener);
    window.removeEventListener("resize", listener);
  }
};

const listenBrowser = ({ exact = false, onChange }) => {
  // console.log(exact);
  const onResize = (e) => {
    let orientation = window.matchMedia("(orientation: landscape)").matches ? "landscape" : "portrait";
    
    let breakpoint = "";
    for (const [key, val] of Object.entries(Breakpoints)) {
      if (window.innerWidth > val) {
        breakpoint = key;
      }
    }

    let device = "desktop";
    if (window.innerWidth >= Breakpoints.lg) {
      device = "desktop";
    } else if (window.innerWidth < Breakpoints.sm) {
      device = "mobile";
    } else {
      device = "tablet";
    }
    
    if (onChange)
      onChange({
        orientation,
        breakpoint,
        device,
      });
  };

  if (typeof window != "undefined") {
    window.addEventListener("resize", onResize);
    onResize();
  }

  return onResize;
};

export const useNextBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState("lg");

  useEffect(() => {
    // listen for browser changed
    const resize = listenBrowser({ exact: false, onChange: (e) => setBreakpoint(e.breakpoint) });
    // unmount / clean up
    return () => muteBrowser(resize);
  }, []);

  return breakpoint;
};

export const useNextOrientation = (exact = false) => {
  const [orientation, setOrientation] = useState("desktop");

  useEffect(() => {
    // listen for browser changed
    const resize = listenBrowser({ exact, onChange: (e) => setOrientation(e.orientation) });
    // unmount / clean up
    return () => muteBrowser(resize);
  }, []);

  return orientation;
};

export const useNextDevice = (exact = false) => {
  const [orientation, setOrientation] = useState("desktop");

  useEffect(() => {
    // listen for browser changed
    const resize = listenBrowser({ exact, onChange: (e) => setOrientation(e.orientation) });
    // unmount / clean up
    return () => muteBrowser(resize);
  }, []);

  return orientation;
};

export const useNextResponsive = (exact = false) => {
  const [browser, setBrowser] = useState({
    orientation: "landscape",
    breakpoint: "lg",
    device: "desktop",
  });

  useEffect(() => {
    // listen for browser changed
    const resize = listenBrowser({ exact, onChange: (e) => setBrowser({ ...e }) });
    // unmount / clean up
    return () => muteBrowser(resize);
  }, []);

  return browser;
};
