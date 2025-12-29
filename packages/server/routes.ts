import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';
import { PrismaClient } from './generated/prisma/client';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});

router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello World!' });
});

router.post('/api/chat', chatController.sendMessage);

router.get('/api/products/:id/reviews', async (req: Request, res: Response) => {
   const prisma = new PrismaClient();

   const productId = Number(req.params.id);
   // TODO: Implement product reviews endpoint

   const reviews = await prisma.review.findMany({
      where: {
         productId,
      },

      orderBy: {
         createdAt: 'desc',
      },
   });

   res.json(reviews);
});

export default router;
