import cors from "cors";
import express from "express";
import { config } from "../config";

export const setupMiddleware = (app: express.Application): void => {
  // CORS middleware
  app.use(cors(config.cors));

  // Body parsing middleware
  app.use(express.json());
};
