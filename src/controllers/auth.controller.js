import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

export const authController = {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ error: 'Email and password are required' });

      const existing = await User.findOne({ where: { email } });
      if (existing) return res.status(400).json({ error: 'User already exists' });

      const user = await User.create({ email, password });
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error registering user' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'devsecret',
        { expiresIn: '1h' }
      );

      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Login error' });
    }
  }
};
