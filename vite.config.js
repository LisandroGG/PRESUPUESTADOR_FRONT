import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	base: "./",

	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "src/components"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@routes": path.resolve(__dirname, "src/routes"),
			"@redux": path.resolve(__dirname, "src/redux"),
			"@hooks": path.resolve(__dirname, "src/hooks"),
			"@api": path.resolve(__dirname, "src/api"),
			"@utils": path.resolve(__dirname, "src/utils"),
		},
	},

	server: {
		port: 5173,
		open: true,
	},

	build: {
		outDir: "dist",
		assetsDir: "assets",
		chunkSizeWarningLimit: 500,
	},
});
