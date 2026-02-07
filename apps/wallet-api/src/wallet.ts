import bip39 from "bip39";
import * as ecc from "tiny-secp256k1";
import { BIP32Factory } from "bip32";
import * as bitcoin from "bitcoinjs-lib";
import { Wallet } from "ethers";
import TronWeb from "tronweb";
import type { AddressBundle } from "./types.js";

const bip32 = BIP32Factory(ecc);

function toHex(buf: Uint8Array): string {
  return Buffer.from(buf).toString("hex");
}

export function generateMnemonic(strength = 128): string {
  return bip39.generateMnemonic(strength);
}

export function deriveAddresses(mnemonic: string): AddressBundle {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error("Invalid mnemonic");
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed);

  // BTC Testnet (BIP44 coin type 1), legacy P2PKH
  const btcPath = "m/44'/1'/0'/0/0";
  const btcNode = root.derivePath(btcPath);
  if (!btcNode.privateKey) {
    throw new Error("BTC derivation failed (no private key)");
  }

  const btcNet = bitcoin.networks.testnet;
  const btcPayment = bitcoin.payments.p2pkh({
    pubkey: btcNode.publicKey,
    network: btcNet
  });
  if (!btcPayment.address) {
    throw new Error("BTC address generation failed");
  }

  // ETH (Sepolia uses standard ETH derivation)
  const ethPath = "m/44'/60'/0'/0/0";
  const ethNode = root.derivePath(ethPath);
  if (!ethNode.privateKey) {
    throw new Error("ETH derivation failed (no private key)");
  }

  const ethPriv = "0x" + toHex(ethNode.privateKey);
  const ethWallet = new Wallet(ethPriv);

  // TRON (Nile uses same address format; network matters when broadcasting)
  const tronPrivNo0x = ethPriv.slice(2);
  const tronAddress = TronWeb.utils.address.fromPrivateKey(tronPrivNo0x);
  if (!tronAddress) {
    throw new Error("TRON address generation failed");
  }

  return {
    bitcoin: { network: "testnet", address: btcPayment.address, path: btcPath },
    ethereum: { network: "sepolia", address: ethWallet.address, path: ethPath },
    tron: { network: "nile", address: tronAddress, path: ethPath }
  };
}
