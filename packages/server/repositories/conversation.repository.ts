//Implementation details
const conversations = new Map<string, string>();

//Export the public interface of the model
export const conversationsRepository = {
   getLastResponseId(conversationId: string): string | undefined {
      return conversations.get(conversationId);
   },

   setLastResponseId(conversationId: string, responseId: string): void {
      conversations.set(conversationId, responseId);
   },
};
