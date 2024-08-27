interface Settings {
  apiKey: string;
  maxTokens: number;
  source: string;
  model: string;
}

class SettingsService {
  static saveSettings(settings: Settings): void {
    localStorage.setItem("settings", JSON.stringify(settings));
  }

  static getSettings(): Partial<Settings> {
    return JSON.parse(localStorage.getItem("settings") || "{}");
  }

  static clearSettings(): void {
    localStorage.removeItem("settings");
  }
}

export default SettingsService;
