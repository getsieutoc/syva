import { BufferMemory, ChatMessageHistory } from 'langchain/memory';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { Message } from 'ai';

export const formatMessage = (message: Message) => {
  return `${message.role}: ${message.content}`;
};

const getChatMessages = (history: Message[]): any[] => {
  return history.map((message) =>
    message.role === 'user'
      ? new HumanMessage(message.content)
      : new AIMessage(message.content)
  );
};

const extractLastQuestion = (messages: Message[]) => {
  const question =
    messages.length > 0 ? messages[messages.length - 1].content : '';
  const previousMessages = messages.slice(0, messages.length - 1);

  return { question, previousMessages };
};

export const getMemory = (messages: Message[]) => {
  const { question, previousMessages } = extractLastQuestion(messages);

  const messageHistory = getChatMessages(previousMessages);

  const memory = new BufferMemory({
    memoryKey: 'chat_history',
    returnMessages: true,
    inputKey: 'input',
    outputKey: 'output',
    chatHistory: new ChatMessageHistory(messageHistory),
  });

  return { memory, question, previousMessages };
};
