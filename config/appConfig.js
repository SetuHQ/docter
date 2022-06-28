// ENV values = "development" | "sandbox" | "production"

const AppEnvironment = {
    DEVELOPMENT: "development",
    STAGING: "staging",
    PRODUCTION: "production",
};

const appEnv = process.env.NEXT_PUBLIC_NODE_ENV || AppEnvironment.STAGING;

const baseUrls = {
    development: process.env.NEXT_PUBLIC_DOCS_URL || "http://localhost:3000",
    staging: process.env.NEXT_PUBLIC_DOCS_URL || "",
    production: process.env.NEXT_PUBLIC_DOCS_URL || "",
};
// Note add nginx route to pass /api/proxy to frontend

let appConfig = {
    environment: appEnv,
    baseUrls: baseUrls[appEnv],
};

let proxyConfig = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
};

export { AppEnvironment, appEnv, appConfig, proxyConfig };
