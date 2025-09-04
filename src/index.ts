import express from "express";
import { config } from "./config";
import { setupMiddleware } from "./middleware";
import { routes } from "./routes";

const app = express();

// Setup middleware
setupMiddleware(app);

// Setup routes
app.use("/", routes);

// Start server
app.listen(config.port, () => {
  console.log(`🚀 Server running at http://localhost:${config.port}`);
});
