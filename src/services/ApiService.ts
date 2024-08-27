interface Message {
  role: string;
  content: string;
}

class ApiService {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string) {
    this.apiKey = apiKey;
    this.model = model;
  }

  async fetchChatResponse(
    messages: Message[],
    maxTokens: number
  ): Promise<string> {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      cache: "no-cache",
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        max_tokens: maxTokens,
      }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    return data.choices[0].message.content;
  }
}

export default ApiService;
