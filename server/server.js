// Local development entry point only. In production this app is deployed as
// a single Vercel serverless function via api/index.js — see that file.
//
// Uses the side-effecting `dotenv/config` import (not `import dotenv from
// 'dotenv'; dotenv.config()`) because ES module imports are fully evaluated
// before any of this file's own statements run — a plain `dotenv.config()`
// call here would execute *after* './app.js' (and its DATABASE_URL read)
// had already been evaluated, silently ignoring the .env file.
import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Local dev server running on http://localhost:${PORT}`);
});
