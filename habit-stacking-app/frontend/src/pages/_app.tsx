import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={dmSans.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;