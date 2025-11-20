import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Righteous } from 'next/font/google';

const righteous = Righteous({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={righteous.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;