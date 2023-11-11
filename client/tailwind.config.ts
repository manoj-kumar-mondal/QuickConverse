import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'headerBg': 'var(--header-bg)',
        'menuBg': 'var(--menubar-bg)',
        'chatWindowBg': 'var(--chat-window-bg)',
        'contactActiveBg': 'var(--contact-active-bg)',
        'contactHoverBg': 'var(--contact-hover-bg)'
      },
      colors: {
        'iconLight': 'var(--light-icon)',
        'secondary': 'var(--light-color-font)',
        'msgPrimary': 'var(--text-msg-primary-bg)',
        'msgSecondary': 'var(--text-msg-secondary-bg)',
      }
    },
  },
  plugins: [],
}
export default config
