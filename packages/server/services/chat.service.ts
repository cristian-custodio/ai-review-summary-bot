import { conversationsRepository } from '../repositories/conversation.repository';
import { OpenAI } from 'openai';
import template from '../prompts/chatbot.txt';
import fs from 'fs';
import path from 'path';

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const parkInfo = fs.readFileSync(
   path.join(__dirname, '../prompts/WonderWorld.md'),
   'utf8'
);

const instructions = template.replace('{{parkInfo}}', parkInfo);

type ChatResponse = {
   id: string;
   message: string;
};

export const chatService = {
   sendMessage: async (
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> => {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         instructions,
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 200,
         previous_response_id:
            conversationsRepository.getLastResponseId(conversationId),
      });

      conversationsRepository.setLastResponseId(conversationId, response.id);

      return {
         id: response.id,
         message: response.output_text,
      };
   },
};
