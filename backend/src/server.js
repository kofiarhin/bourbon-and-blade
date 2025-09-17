import { createApp } from "./app.js";
import { getEnv } from "./config/env.js";

const startServer = () => {
  const app = createApp();
  const { port } = getEnv();

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Blade & Bourbon API listening on port ${port}`);
  });
};

startServer();
