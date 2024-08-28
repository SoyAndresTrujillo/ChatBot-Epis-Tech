export class ChatService {
  static async sendMessage(
    apiKey: string,
    model: string,
    message: string,
    conversation: any
  ) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: message }],
        max_tokens: 100,
      }),
    });
    return response.json();
  }

  static getSettings() {
    return JSON.parse(localStorage.getItem("settings") || "{}");
  }

  static saveSettings(settings: any) {
    localStorage.setItem("settings", JSON.stringify(settings));
  }

  static createNewConversation(title: string, conversations: any[]) {
    const newConversation = { name: title, messages: [] };
    conversations.push(newConversation);
    return conversations.length - 1;
  }
}
