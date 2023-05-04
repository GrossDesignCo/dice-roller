import Head from 'next/head';
import { Inter } from 'next/font/google';
import { Main } from '@/components/main';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Dice Roller</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${inter.className} outer-layout`}>
        <Main />
      </main>

      <footer className={inter.className}>Other Presets</footer>
    </>
  );
}
