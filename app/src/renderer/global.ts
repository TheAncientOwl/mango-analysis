export {};
declare global {
  interface Window {
    electronAPI: {
      showOpenCsvDialog: () => Promise<string | null>;
      showOpenDirectoryDialog: () => Promise<string | null>;
    };
  }
}
