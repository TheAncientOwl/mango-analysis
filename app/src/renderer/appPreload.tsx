import { contextBridge, ipcRenderer } from 'electron';

interface ElectronAPI {
  getImportCsvPath: () => Promise<string | null>;
  getCopyAnalysisImageSavePath: () => Promise<string | null>;
  showSaveDialog: (options: Electron.SaveDialogOptions) => Promise<string | null>;
  copyFileSync: (src: string, dest: string) => void;
  getHomeDir: () => Promise<string>;
  getAppDataPath: () => Promise<string>;
  resolve: (part1: string, part2: string) => Promise<string>;

  appWindow: {
    minimize: () => void;
    toggleMaximize: () => void;
    close: () => void;
  };
}

const electron: ElectronAPI = {
  getImportCsvPath: () => ipcRenderer.invoke('get-import-csv-path'),
  getCopyAnalysisImageSavePath: () => ipcRenderer.invoke('get-copy-analysis-image-save-path'),
  showSaveDialog: options => ipcRenderer.invoke('show-save-dialog', options),
  copyFileSync: (src, dest) => ipcRenderer.invoke('copy-file-sync', src, dest),
  getHomeDir: () => ipcRenderer.invoke('get-home-dir'),
  getAppDataPath: () => ipcRenderer.invoke('get-app-data-path'),
  resolve: (part1: string, part2: string) => ipcRenderer.invoke('resolve', part1, part2),

  appWindow: {
    minimize: () => ipcRenderer.invoke('window-minimize'),
    toggleMaximize: () => ipcRenderer.invoke('window-toggle-maximize'),
    close: () => ipcRenderer.invoke('window-close'),
  },
};

contextBridge.exposeInMainWorld('electron', electron);

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export {};
