import tailwindcss from "@tailwindcss/vite"
import path from "node:path";
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [react(), tailwindcss()],

	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "src/components"),
			"@redux": path.resolve(__dirname, "src/redux"),
			"@api": path.resolve(__dirname, "src/api"),
		},
	},

	server: {
		port: 5173,
		open: true,
	},

	build: {
		chunkSizeWarningLimit: 500,
	},
})
