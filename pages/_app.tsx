import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import { MustBeAny } from '@/types';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';

export default function MyApp({ Component, pageProps }: MustBeAny) {

  useEffect(() => {
    fetch('/api/socket');
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <Head>
          <title>Ride Hailing Dashboard</title>
          <meta name="description" content="Manage your ride-hailing service efficiently." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Toaster />
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}
