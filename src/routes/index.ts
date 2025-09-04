import express, { Request, Response, Router } from "express";
import { SignatureService } from "../services/signatureService";
import { VerifySignatureRequest, ErrorResponse } from "../types";

const router: Router = express.Router();
const signatureService = new SignatureService();

// Health check endpoint
router.get("/health", (_, res: Response) => {
  res.status(200).send("OK");
});

// Signature verification endpoint
router.post(
  "/verify-signature",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await signatureService.verifySignature(
        req.body as VerifySignatureRequest
      );
      res.status(200).json(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal Server Error";
      const statusCode =
        errorMessage.includes("Invalid body") ||
        errorMessage.includes("signature must be")
          ? 400
          : 500;

      const errorResponse: ErrorResponse = { error: errorMessage };
      res.status(statusCode).json(errorResponse);
    }
  }
);

export { router as routes };
