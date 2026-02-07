export type AddressBundle = {
  bitcoin: { network: "testnet"; address: string; path: string };
  ethereum: { network: "sepolia"; address: string; path: string };
  tron: { network: "nile"; address: string; path: string };
};

export type WalletResponse = {
  addresses: AddressBundle;
  mnemonic?: string;
};
