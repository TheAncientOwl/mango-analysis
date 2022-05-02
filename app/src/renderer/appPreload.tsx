import { contextBridge, ipcRenderer } from 'electron';

interface ElectronAPI {
  getImportCsvPath: () => Promise<string | null>;
  getCopyAnalysisImageSavePath: () => Promise<string | null>;
  showSaveDialog: (options: Electron.SaveDialogOptions) => Promise<string | null>;
  copyFileSync: (src: string, dest: string) => void;

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
