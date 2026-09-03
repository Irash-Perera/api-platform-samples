import express from "express";

const app = express();

// get a hello world greeting
app.get("/hello", (_, res) => {
  return res.json({ message: "Hello, World!" });
});

// health check
app.get("/healthz", (_, res) => {
  return res.sendStatus(200);
});

app.use((err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.use("*", (_, res) => {
  return res.status(404).json({ error: "The requested resource does not exist on this server" });
});

export default app;
