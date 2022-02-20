import { contextBridge, ipcRenderer } from 'electron';

interface ElectronAPI {
  getImportCsvPath: () => Promise<string | null>;
  getExportCsvDirectoryPath: () => Promise<string | null>;

  appWindow: {
    minimize: () => void;
    toggleMaximize: () => void;
    close: () => void;
  };
}

const electron: ElectronAPI = {
  getImportCsvPath: () => ipcRenderer.invoke('get-import-csv-path'),
  getExportCsvDirectoryPath: () => ipcRenderer.invoke('get-export-csv-directory-path'),

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
