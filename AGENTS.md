# AGENTS.md

## How to run
- Backend: `cd apps/wallet-api` then `npm install` and `npm run dev`
- Frontend: `cd apps/wallet-ui` then `npm install` and `npm start`
- URLs: `http://localhost:3000` (API), `http://localhost:4200` (UI)

## How to test
- API: `cd apps/wallet-api` then `npm test` and `npm run lint`

## Security constraints
- Never return mnemonics or private keys to the frontend by default.
- Avoid logging secrets (mnemonic, private keys).

## Derivation rules
- BTC testnet: `m/44'/1'/0'/0/0`
- ETH: `m/44'/60'/0'/0/0`
- TRON: derived from secp256k1 private key (same key material as ETH)

## Repository expectations
- Prefer TypeScript for Node services.
- Keep derivation paths explicit and documented.
- Add or adjust tests for any behavior changes.
## Review guidelines
- Validate inputs and handle errors with clear messages.
- Keep endpoints stable and versionable.
