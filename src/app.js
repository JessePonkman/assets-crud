import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as assetRoutes } from './routes/assets.routes.js';
import { sequelize } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('src/public'));
app.use('/api/assets', assetRoutes);
app.use(errorHandler); // 👈 manejo global de errores

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connection established');
    await sequelize.sync();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ DB connection error:', err);
  }
})();
