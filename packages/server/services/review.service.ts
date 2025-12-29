import type { Review } from '../generated/prisma/client';
import { llmClient } from '../llm/client';
import { reviewRepository } from '../repositories/review.repository';

export const reviewService = {
   getReviews: async (productId: number): Promise<Review[]> => {
      return reviewRepository.getReviews(productId);
   },
   summarizeReviews: async (productId: number): Promise<string> => {
      const reviews = await reviewRepository.getReviews(productId, 10);

      const joinedReviews = reviews.map((r) => r.content).join('\n\n');
      const prompt = `Summarize the following customer reviews in a short paragraph highlighting key themes, both positive and negative: ${joinedReviews}`;

      const reponse = await llmClient.generateText({
         model: 'gpt-4.1',
         prompt,
         temperature: 0.2,
         maxTokens: 500,
      });

      return reponse.text;
   },
};
