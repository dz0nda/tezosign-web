import { useMemo } from 'react';

const explorerNetworks = {
  main: 'mainnet',
  hangzhou: 'hangzhounet',
  ithaca: 'ithacanet',
  jakarta: 'jakartanet',
  ghost: 'ghostnet',
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
