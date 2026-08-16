import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

// Falls back to a random per-boot secret if JWT_SECRET isn't set, so the server
// still runs — admins are just signed out whenever the process restarts.
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
const TOKEN_TTL = '12h';

export function signAdminToken(username) {
  return jwt.sign({ role: 'admin', username }, JWT_SECRET, { expiresIn: TOKEN_TTL });
}

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.role !== 'admin') throw new Error('Not an admin token');
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function checkAdminCredentials(username, password) {
  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;
  if (!validUsername || !validPassword) return false;
  return username === validUsername && password === validPassword;
}
