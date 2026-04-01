import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.json({ ok: true, db: ready ? 'connected' : 'disconnected' });
});

app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name } = req.body ?? {};

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ ok: false, message: 'Email is required' });
    }
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ ok: false, message: 'Password is required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ ok: false, message: 'Password must be at least 6 characters' });
    }

    const emailNorm = email.trim().toLowerCase();
    const existing = await User.findOne({ email: emailNorm });
    if (existing) {
      return res.status(409).json({ ok: false, message: 'Email already registered' });
    }

    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email: emailNorm,
      password: hash,
      name: typeof name === 'string' ? name.trim() : '',
    });

    return res.status(201).json({ ok: true, message: 'Registered' });
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ ok: false, message: 'Email already registered' });
    }
    console.error('[register]', err);
    return res.status(500).json({
      ok: false,
      message: process.env.NODE_ENV === 'production' ? 'Server error' : err.message,
    });
  }
});

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Missing MONGODB_URI in .env');
    process.exit(1);
  }

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected:', mongoose.connection.name);
  } catch (e) {
    console.error('MongoDB connection failed:', e.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`API http://localhost:${PORT}`);
  });
}

main();
