import { recoverMessageAddress, type Hex } from "viem";
import { VerifySignatureRequest, VerifySignatureResponse } from "../types";

export class SignatureService {
  /**
   * Validates if a string is a valid hex signature
   */
  private isValidHexSignature(signature: string): boolean {
    return typeof signature === "string" && /^0x[0-9a-fA-F]+$/.test(signature);
  }

  /**
   * Validates the request body structure
   */
  private validateRequest(body: any): { isValid: boolean; error?: string } {
    if (!body || typeof body !== "object") {
      return { isValid: false, error: "Request body is required" };
    }

    const { message, signature } = body;

    if (typeof message !== "string" || typeof signature !== "string") {
      return {
        isValid: false,
        error: "Invalid body. Expect { message: string, signature: string }",
      };
    }

    if (!this.isValidHexSignature(signature)) {
      return {
        isValid: false,
        error: "signature must be a 0x-prefixed hex string",
      };
    }

    return { isValid: true };
  }

  /**
   * Verifies a signature against a message
   */
  async verifySignature(
    request: VerifySignatureRequest
  ): Promise<VerifySignatureResponse> {
    const validation = this.validateRequest(request);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const { message, signature } = request;

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

    return {
      isValid,
      signer: signerAddress,
      originalMessage: message,
    };
  }
}
