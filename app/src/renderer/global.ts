export {};
declare global {
  interface Window {
    electronAPI: {
      showOpenCsvDialog: () => Promise<string | null>;
    };
  }
}
