class ChatUI {
  private container: HTMLElement;
  private chatSpeed: number;
  private showTokens: boolean;

  constructor(container: HTMLElement, chatSpeed: number, showTokens: boolean) {
    this.container = container;
    this.chatSpeed = chatSpeed;
    this.showTokens = showTokens;
    this.init();
  }

  private init(): void {
    this.container.innerHTML = this._renderInitialUI();
    this._attachEventListeners();
  }

  private _renderInitialUI(): string {
    return `
        ${this._sidebarTemplate()}
        <main class="content">               
            ${this._welcomePageTemplate()}
            <form class="message-form">
                <input type="text" placeholder="Type a message..." required>
                <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>
            </form>
        </main>`;
  }

  private _sidebarTemplate(): string {
    return `
        <a href="#" class="open-sidebar" title="Open Sidebar"><i class="fa-solid fa-bars"></i></a>
        <nav class="conversations">
            <a class="new-conversation" href="#"><i class="fa-solid fa-plus"></i>New Conversation</a>
            <div class="list"></div>
            <div class="footer">
                <a class="save" href="#" title="Save"><i class="fa-solid fa-floppy-disk"></i></a>
                <a class="open-database" href="#"><i class="fa-regular fa-folder-open"></i></a>
                <a class="settings" href="#"><i class="fa-solid fa-cog"></i></a>
                <a class="close-sidebar" href="#" title="Close Sidebar"><i class="fa-solid fa-bars"></i></a>
            </div>
        </nav>`;
  }

  private _welcomePageTemplate(): string {
    return `
        <div class="welcome">
            <h1>ChatAI<span class="ver">1.0.0</span></h1>                    
            <p>Made with love by <a href="https://codeshack.io" target="_blank">CodeShack</a> &lt;3</p>
            <a href="#" class="open-database"><i class="fa-regular fa-folder-open"></i>Open Database...</a>
        </div>`;
  }

  public displayMessage(
    role: string,
    content: string,
    date: Date = new Date(),
    totalTokens: number | null = null
  ): void {
    const messageClass = role === "assistant" ? "assistant" : "user";
    const tokenInfo =
      this.showTokens && totalTokens
        ? `<div><span class="tokens">${totalTokens} Tokens</span></div>`
        : "";
    const messageHtml = `
        <div class="message ${messageClass}">
          <div class="wrapper">
            <div class="avatar">${
              role === "assistant" ? "AI" : '<i class="fa-solid fa-user"></i>'
            }</div>
            <div class="details">
              <div class="date" title="${date.toISOString()}">${this.formatElapsedTime(
      date
    )}</div>
              <div class="text">${content}${tokenInfo}</div>
            </div>
          </div>
        </div>`;
    this.container
      .querySelector(".messages")!
      .insertAdjacentHTML("beforeend", messageHtml);
    this.scrollToBottom();
  }

  private formatElapsedTime(date: Date): string {
    const now = new Date();
    const elapsed = now.getTime() - date.getTime();
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 1) return `${days} days ago`;
    if (days === 1) return "Yesterday";
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;

    return `${seconds} seconds ago`;
  }

  private scrollToBottom(): void {
    this.container.querySelector(".content .messages")!.scrollTop =
      this.container.querySelector(".content .messages")!.scrollHeight;
  }

  private _attachEventListeners(): void {
    // Event handlers for the UI
  }
}

export default ChatUI;
