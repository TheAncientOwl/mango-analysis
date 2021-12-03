import { contextBridge, ipcRenderer } from 'electron';

interface ElectronAPI {
  getImportCsvPath: () => Promise<string | null>;
  getExportCsvDirectoryPath: () => Promise<string | null>;
  minimizeAppWindow: () => void;
  toggleMaximizeAppWindow: () => void;
  closeAppWindow: () => void;
}

const electron: ElectronAPI = {
  getImportCsvPath: () => ipcRenderer.invoke('get-import-csv-path'),
  getExportCsvDirectoryPath: () => ipcRenderer.invoke('get-export-csv-directory-path'),

  minimizeAppWindow: () => ipcRenderer.invoke('window-minimize'),
  toggleMaximizeAppWindow: () => ipcRenderer.invoke('window-toggle-maximize'),
  closeAppWindow: () => ipcRenderer.invoke('window-close'),
};

contextBridge.exposeInMainWorld('electron', electron);

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export {};
