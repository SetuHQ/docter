const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const withNextPluginPreval = require("next-plugin-preval/config")();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
    async redirects() {
        return [];
    },
    webpack5: false,
};

module.exports = withPlugins([withNextPluginPreval(), optimizedImages, withBundleAnalyzer], nextConfig);
