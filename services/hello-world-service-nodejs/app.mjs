// Copyright (c) 2026, WSO2 LLC. (https://www.wso2.com/) All Rights Reserved.
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied. See the License for the
// specific language governing permissions and limitations
// under the License.

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
