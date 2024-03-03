import React, { useContext } from 'react';
import { Layout, Spin } from 'antd';
import { AppHeader } from './AppHeader';
import { AppSider } from './AppSider';
import { AppContent } from './AppContent';
import CryptoContext from '../../context/crypto-context';

export const AppLayout = () => {
  const { isLoading } = useContext(CryptoContext);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
};
