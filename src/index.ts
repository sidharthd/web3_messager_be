import express, { Request, Response } from "express";
import { recoverMessageAddress, type Hex } from "viem";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGINS?.split(",") || [
    "http://localhost:5173",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/health", (_, res: Response) => {
  res.status(200).send("OK");
});

app.post(
  "/verify-signature",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { message, signature } = req.body ?? {};

      if (typeof message !== "string" || typeof signature !== "string") {
        res.status(400).json({
          error: "Invalid body. Expect { message: string, signature: string }",
        });
        return;
      }

      // Basic hex validation for signature expected by viem
      const isHex =
        typeof signature === "string" && /^0x[0-9a-fA-F]+$/.test(signature);
      if (!isHex) {
        res
          .status(400)
          .json({ error: "signature must be a 0x-prefixed hex string" });
        return;
      }

      // Recover signer address from the provided message/signature
      let signerAddress: string | null = null;
      try {
        signerAddress = await recoverMessageAddress({
          message,
          signature: signature as Hex,
        });
      } catch {
        signerAddress = null;
      }

      const isValid = Boolean(signerAddress);

      res.status(200).json({
        isValid,
        signer: signerAddress,
        originalMessage: message,
      });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
