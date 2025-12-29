import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

// Log DATABASE_URL for verification (password will be visible)
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const app = express();
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
