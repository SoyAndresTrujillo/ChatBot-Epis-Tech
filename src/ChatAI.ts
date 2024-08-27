import ApiService from "./services/ApiService";
import FileService from "./services/FileService";
import SettingsService from "./services/SettingsService";
import ChatUI from "./ui/ChatUI";

interface Conversation {
  name: string;
  messages: { role: string; content: string; date: Date }[];
}

interface ChatAIOptions {
  apiKey: string;
  model: string;
  chatSpeed: number;
  showTokens: boolean;
  maxTokens: number;
  conversations: Conversation[];
  selectedConversation: number | null;
  container: string;
}

class ChatAI {
  private options: ChatAIOptions;
  private apiService: ApiService;
  private fileService: FileService;
  private chatUI: ChatUI;

  constructor(options: Partial<ChatAIOptions>) {
    this.options = {
      apiKey: "",
      model: "gpt-3.5-turbo",
      chatSpeed: 30,
      showTokens: true,
      maxTokens: 100,
      conversations: [],
      selectedConversation: null,
      container: ".chat-ai",
      ...SettingsService.getSettings(),
      ...options,
    };

    this.apiService = new ApiService(this.options.apiKey, this.options.model);
    this.fileService = new FileService();
    this.chatUI = new ChatUI(
      document.querySelector(this.options.container) as HTMLElement,
      this.options.chatSpeed,
      this.options.showTokens
    );
  }

  public async sendMessage(content: string): Promise<void> {
    if (this.options.selectedConversation === null) {
      this.options.selectedConversation = this.createNewConversation();
    }

    const conversation =
      this.options.conversations[this.options.selectedConversation];
    conversation.messages.push({ role: "user", content, date: new Date() });

    try {
      const response = await this.apiService.fetchChatResponse(
        conversation.messages,
        this.options.maxTokens
      );
      this.chatUI.displayMessage("assistant", response);
      this._updateConversation({
        role: "assistant",
        content: response,
        date: new Date(),
      });
    } catch (error) {
      console.error("Error fetching chat response:", error);
      this.chatUI.displayErrorMessage((error as Error).message);
    }
  }

  private _updateConversation(message: {
    role: string;
    content: string;
    date: Date;
  }): void {
    if (this.options.selectedConversation !== null) {
      this.options.conversations[
        this.options.selectedConversation
      ].messages.push(message);
      SettingsService.saveSettings(this.options);
    }
  }

  private createNewConversation(): number {
    const title = `Conversation ${this.options.conversations.length + 1}`;
    const newConversation: Conversation = { name: title, messages: [] };
    this.options.conversations.push(newConversation);
    return this.options.conversations.length - 1;
  }

  // Additional methods for settings, file handling, and event handling
}

export default ChatAI;
