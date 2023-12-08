/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			lg: {max: "2000px"},
			md: {max: "767px"},
			sm: {max: "639px"},
		},
		extend: {},
	},
	plugins: [],
};
