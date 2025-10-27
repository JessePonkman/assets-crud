import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as assetRoutes } from './routes/assets.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { sequelize } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import './models/User.js';
import './models/Asset.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('src/public'));

app.use('/api/auth', authRouter);
app.use('/api/assets', assetRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('✅ DB connected and models synced');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Database error:', err);
  }
})();
