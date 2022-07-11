import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { HomeView } from '../views/home';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Explorer (Reborn) | Solana</title>
                <meta name="description" content="Let's Rebuild Solana Explorer" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="body">
                <h1 className={styles.title}>
                    <Image src="/logo.svg" alt="Solana Explorer" width="600" height="40" />
                </h1>

                <HomeView />
            </div>

            <footer className={styles.footer}>
             
            </footer>
        </div>
    );
};

export default Home;
