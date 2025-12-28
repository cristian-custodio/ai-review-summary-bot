import type { Request, Response } from 'express';
import { z } from 'zod';
import { chatService } from '../services/chat.service';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long'),
   conversationId: z.string().uuid(),
});

export const chatController = {
   sendMessage: async (req: Request, res: Response) => {
      const parsedResult = chatSchema.safeParse(req.body);

      if (!parsedResult.success) {
         return res.status(400).json({ error: parsedResult.error.format() });
      }

      try {
         const { prompt, conversationId } = req.body;
         const response = await chatService.sendMessage(prompt, conversationId);
         res.json({ message: response.message });
      } catch (error) {
         console.error('Error:', error);
         res.status(500).json({ error: 'Failed to generate response' });
      }
   },
};
