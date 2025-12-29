import { conversationsRepository } from '../repositories/conversation.repository';
import { OpenAI } from 'openai';
import template from '../prompts/chatbot.txt';
import fs from 'fs';
import path from 'path';
import { llmClient } from '../llm/client';

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
      const response = await llmClient.generateText({
         prompt: instructions,
         instructions,
         temperature: 0.2,
         maxTokens: 200,
         previousResponseId:
            conversationsRepository.getLastResponseId(conversationId),
      });

      conversationsRepository.setLastResponseId(conversationId, response.id);

      return {
         id: response.id,
         message: response.text,
      };
   },
};
