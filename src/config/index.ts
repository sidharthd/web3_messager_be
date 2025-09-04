import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  cors: {
    allowedOrigins: process.env.CORS_ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:5173",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  },
} as const;
