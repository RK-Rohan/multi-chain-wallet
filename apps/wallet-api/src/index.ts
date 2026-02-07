import express, { type Request, type Response } from "express";
import cors from "cors";
import { deriveAddresses, generateMnemonic } from "./wallet.js";
import type { WalletResponse } from "./types.js";

const app = express();

const defaultOrigins = ["http://localhost:4200"];
const corsOrigins = (process.env.CORS_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowlist = corsOrigins.length > 0 ? corsOrigins : defaultOrigins;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowlist.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    }
  })
);
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "wallet-api" });
});

/**
 * GET /wallet
 * Returns only addresses by default (safe for frontend).
 * Optional: ?includeMnemonic=1 for evaluation environments ONLY.
 */
app.get("/wallet", (req: Request, res: Response) => {
  try {
    const mnemonic = generateMnemonic(128);
    const addresses = deriveAddresses(mnemonic);

    const includeMnemonic = req.query.includeMnemonic === "1";
    const out: WalletResponse = includeMnemonic ? { mnemonic, addresses } : { addresses };

    res.json(out);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(400).json({ error: message });
  }
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`wallet-api listening on http://localhost:${port}`);
});
