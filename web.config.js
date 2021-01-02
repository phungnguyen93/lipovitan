const CONFIG = {
  environment: process.env.NEXT_PUBLIC_ENV || "development",
  site: {
    title: "Lipovitan",
    description: "The ultimate Next.js framework from Digitop a.k.a TOP Group",
  },
  links: {
    facebookPage: "",
  },
  dateFormat: "yyyy-MM-dd HH:mm:ss",
  // these variables can be exposed to front-end:
  NEXT_PUBLIC_PORT_LOCAL: process.env.NEXT_PUBLIC_PORT_LOCAL || "",
  NEXT_PUBLIC_FB_APP_ID: process.env.NEXT_PUBLIC_FB_APP_ID || "",
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || "",
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || "",
  NEXT_PUBLIC_API_BASE_PATH: process.env.NEXT_PUBLIC_API_BASE_PATH || "",
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "",
  NEXT_PUBLIC_APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN || "",
  // some secret keys which won't be exposed to front-end:
  SOME_SECRET_KEY: process.env.SOME_SECRET_KEY || "",
  IRON_SESSION_NAME: "MYADMINCMSCOOKIE",
  IRON_SESSION_SECRET: process.env.IRON_SESSION_SECRET || "",
  SESSION_NAME : "MYFRONTENDCOOKIE",
  SESSION_SECRET : process.env.SESSION_SECRET || "",

  getBasePath: () => {
    return CONFIG.NEXT_PUBLIC_BASE_PATH ? "/" + CONFIG.NEXT_PUBLIC_BASE_PATH : "";
  },
  getBaseURL: () => {
    return CONFIG.NEXT_PUBLIC_BASE_URL ?  CONFIG.NEXT_PUBLIC_BASE_URL : "";
  },
  path: (path) => {
    return CONFIG.getBasePath() + path;
  },
};

if (typeof window != "undefined") {
  window.__config__ = CONFIG;
  // console.log(CONFIG);
} else {
  // console.log(CONFIG);
}

export default CONFIG;
