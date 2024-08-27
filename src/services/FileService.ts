class FileService {
  async readJsonFile(): Promise<{ content: any; name: string } | undefined> {
    try {
      const [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      const fileContents = await file.text();
      return { content: JSON.parse(fileContents), name: file.name };
    } catch (error: any) {
      console.error("Error reading JSON file:", error);
      throw error;
    }
  }

  async saveJsonToFile(
    jsonObject: any,
    suggestedName: string = "ai-conversations.json"
  ): Promise<void> {
    try {
      const options = {
        suggestedName,
        types: [
          {
            description: "JSON Files",
            accept: { "application/json": [".json"] },
          },
        ],
      };
      const handle = await window.showSaveFilePicker(options);
      const writable = await handle.createWritable();
      await writable.write(JSON.stringify(jsonObject, null, 2));
      await writable.close();
    } catch (error: any) {
      console.error("Error saving JSON file:", error);
      throw error;
    }
  }
}

export default FileService;
