// Next, React
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import styles from '../../styles/Home.module.css';
import { Account } from '../../components/Account';

export const HomeView: FC = ({ }) => {
    return (
        <main className={styles.main}>
            {/* <div className={styles.walletButtons}>
            <WalletMultiButton />
            <WalletDisconnectButton />
        </div> */}
            <Account />
        </main>
    );
};