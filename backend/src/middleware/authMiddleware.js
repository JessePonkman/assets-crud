import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'Missing Authorization header' });

  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Invalid Authorization header' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = decoded; // { userId, email }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
