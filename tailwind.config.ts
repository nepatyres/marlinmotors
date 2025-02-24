import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/*.{js,ts,jsx,tsx,mdx}",
    "./src/constants/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ubuntuL': ['"Ubuntu-light"'],
        'ubuntu': ['"Ubuntu"'],
        'ubuntuB': ['"Ubuntu-bold"'],
        'gruppo': ['"Gruppo"'],
        'raleway': ['"Raleway"'],
        'montserrat': ['"Montserrat"'],
        'montserratR': ['"MontserratR"'],
      },
      colors: {
        'dot6': 'rgba(255, 255, 255, .6)',
        'dot7': 'rgba(255, 255, 255, .7)',
        'dot8': 'rgba(255, 255, 255, .8)',
        'dot9': 'rgba(255, 255, 255, .9)',
        'bdot05': 'rgba(255, 255, 255, .05)',
        'bdot9': 'rgba(0, 0, 0, .9)',
        'bdot8': 'rgba(0, 0, 0, .8)',
        'bdot4': 'rgba(0, 0, 0, .4)',
        'rdot': 'rgba(255, 0, 0, .7)',
        'gdot1' : 'rgba(75, 85, 99, .1)'
      },
    },
  },
  plugins: [],
};
export default config;
