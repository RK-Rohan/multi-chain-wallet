# Multi-Chain Wallet Viewer

This project demonstrates deterministic multi-chain address derivation from a single BIP-39 mnemonic.

A Node.js backend generates addresses for Bitcoin Testnet, Ethereum (Sepolia), and TRON (Nile) using standard BIP-44 derivation paths. An Angular frontend fetches those addresses and displays them.

## Architecture

### Backend (Node.js)
- Generates a BIP-39 mnemonic per request (server-side only).
- Derives chain-specific addresses using standard derivation paths.
- Exposes `GET /wallet`.
- Returns public addresses only by default.

### Frontend (Angular)
- Calls the backend API.
- Displays BTC, ETH, and TRON addresses.
- Shows loading and error states.
- Receives no sensitive key material.

## Supported Networks
- Bitcoin Testnet
- Ethereum Sepolia
- TRON Nile

## Security
- Mnemonic and private keys never leave the backend by default.
- The frontend receives addresses only.

## Prerequisites
- Node.js 20+ (tested with 22)
- Angular CLI (`npm i -g @angular/cli`)

## How to Run

Terminal A (Backend):

```powershell
cd apps\wallet-api
npm install
npm test
npm run lint
npm run dev
```

Terminal B (Frontend):

```powershell
cd apps\wallet-ui
npm install
npm start
```

## URLs
- API: `http://localhost:3000`
- UI: `http://localhost:4200`

## Verification

```powershell
curl http://localhost:3000/
curl http://localhost:3000/wallet
```

## Sample Response Shape

```json
{
  "addresses": {
    "bitcoin": {
      "network": "testnet",
      "address": "m...",
      "path": "m/44'/1'/0'/0/0"
    },
    "ethereum": {
      "network": "sepolia",
      "address": "0x...",
      "path": "m/44'/60'/0'/0/0"
    },
    "tron": {
      "network": "nile",
      "address": "T...",
      "path": "m/44'/60'/0'/0/0"
    }
  }
}
```

## Notes

- The API generates a new mnemonic by default and does not expose it unless explicitly enabled for local evaluation.
- No on-chain broadcasts, faucets, or storage are included.
