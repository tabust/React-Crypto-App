import React, { useContext } from 'react';
import { createContext } from 'react';
import { fakeFetchAssets, fakeFetchCrypto } from '../api';
import { percentDifference } from '../utils';

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export const CryptoContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [assets, setAssets] = React.useState([]);
  const [crypto, setCrypto] = React.useState([]);

  const mapAssets = (assets, result) => {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      };
    });
  };

  React.useEffect(() => {
    async function preload() {
      setIsLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fakeFetchAssets();

      setAssets(mapAssets(assets, result));
      setCrypto(result);
      setIsLoading(false);
    }
    preload();
  }, []);

  const addAsset = (newAsset) => {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  };

  return (
    <CryptoContext.Provider value={{ isLoading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext;

export const useCrypto = () => {
  return useContext(CryptoContext);
};
