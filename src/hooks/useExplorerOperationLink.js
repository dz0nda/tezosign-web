import { useMemo } from 'react';

const explorerNetworks = {
  hangzhou: 'hangzhounet',
  ithaca: 'ithacanet',
  main: 'mainnet',
};

const useExplorerOperationLink = (transactionHash) => {
  const explorerOperationLink = useMemo(() => {
    return `https://${
      explorerNetworks[process.env.REACT_APP_TEZOS_NETWORK]
    }.tzkt.io/${transactionHash}`;
  }, [transactionHash]);

  return { explorerOperationLink };
};

export default useExplorerOperationLink;
