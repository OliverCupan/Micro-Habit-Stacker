import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={nunito.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;