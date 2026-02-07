import test from "node:test";
import assert from "node:assert/strict";
import { generateMnemonic, deriveAddresses } from "../src/wallet.js";

test("derive addresses from mnemonic", () => {
  const mnemonic = generateMnemonic();
  const addresses = deriveAddresses(mnemonic);

  assert.equal(addresses.bitcoin.network, "testnet");
  assert.ok(addresses.bitcoin.address.length > 10);
  assert.ok(
    /^([mn]|tb1)/.test(addresses.bitcoin.address),
    "BTC testnet address should start with m/n or tb1"
  );

  assert.equal(addresses.ethereum.network, "sepolia");
  assert.ok(addresses.ethereum.address.startsWith("0x"));

  assert.equal(addresses.tron.network, "nile");
  assert.ok(addresses.tron.address.startsWith("T"));
});
