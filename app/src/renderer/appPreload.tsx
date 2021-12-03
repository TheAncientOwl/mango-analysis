import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getImportCsvPath: (): Promise<string | null> => ipcRenderer.invoke('get-import-csv-path'),
  getExportCsvDirectoryPath: () => ipcRenderer.invoke('get-export-csv-directory-path'),

  minimizeAppWindow: () => ipcRenderer.invoke('window-minimize'),
  toggleMaximizeAppWindow: () => ipcRenderer.invoke('window-toggle-maximize'),
  closeAppWindow: () => ipcRenderer.invoke('window-close'),
});

export {};
declare global {
  interface Window {
    electron: {
      getImportCsvPath: () => Promise<string | null>;
      getExportCsvDirectoryPath: () => Promise<string | null>;
      minimizeAppWindow: () => void;
      toggleMaximizeAppWindow: () => void;
      closeAppWindow: () => void;
    };
  }
}
