const { Configuration, OpenAIApi, OpenAIResponse } = require("openai");

export interface ILeadDetails {
  key: string; // For example, first_name, last_name, dob, title
  value: any;
}
export interface IConversation {
  author: string;
  message: string;

  action?: string;
  day?: string | null;
  //UNIX TIMESTAMP
  timestamp?: number;
}

//CHATBOT OF THE AI DOCTOR
export class ChatBot {
  private readonly openAi: typeof OpenAIApi;
  //The conversation is static because the instance might be created again in nextjs so it's best to keep it this way
  static conversation: IConversation[] = [];
  private constructor(
    openAi: typeof OpenAIApi,
  ) {
    this.openAi = openAi;
  }
  //static method to instantiate the class
  static create(
  ): ChatBot {
    const realOpenAI = new OpenAIApi(
      new Configuration({
        apiKey: process.env.NEXT_PUBLIC_API_KEY, // process.env.OPENAI_KEY,
      })
    );
    let timestamp = new Date().getTime();
    //TODO: Edit the prompt to only respond in JSON format
    const systemMessage = `You are an AI doctor, you receive symptoms from patients and give them a perfect diagnosis. Give a single cause and do not recommend a medical professional. DO NOT RECOMMEND A MEDICAL PROFESSIONAL`;

    const systemMessageObj = {
      author: "SYSTEM",
      message: systemMessage
    };
    ChatBot.conversation.push(systemMessageObj);


    return new ChatBot(
      realOpenAI,
    );
  }

  //this method gets the dialog, it is seperated to prevent duplicate code
  getDialog() {
    const dialog = ChatBot.conversation.map((c) => {
      const role =
        c.author === "LEAD"
          ? "user"
          : c.author === "USER"
            ? "assistant"
            : "system";
      return {
        role,
        content: c.message
      };
    });
    return dialog;
  }

  //this methods pushed the message to the conversation
  pushConversation(response: typeof OpenAIResponse) {
    ChatBot.conversation.push({
      message: response["data"]["choices"][0]["message"]["content"],
      author: "USER",
    });
  }

  //method to create the next message
  public async createNextMessage(message: string): Promise<string[]> {

    const newMessage = {
      author: "LEAD",
      message: message,
    };
    ChatBot.conversation.push(newMessage);
    const dialog = this.getDialog();
    const response: typeof OpenAIResponse =
      await this.openAi.createChatCompletion({
        model: "gpt-4o-mini",
        messages: dialog,
      });

    this.pushConversation(response);
    return response["data"]["choices"][0]["message"]["content"];
  }
}
