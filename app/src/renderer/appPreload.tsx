import { contextBridge, ipcRenderer } from 'electron';
import { dialog } from '@electron/remote';

contextBridge.exposeInMainWorld('electron', {
  getImportCsvPath: (): Promise<string | null> => ipcRenderer.invoke('get-import-csv-path'),

  showOpenDirectoryDialog: async (): Promise<string | null> => {
    const value = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });

    if (value.canceled) return null;

    return value.filePaths[0];
  },

  minimizeAppWindow: () => ipcRenderer.invoke('window-minimize'),
  toggleMaximizeAppWindow: () => ipcRenderer.invoke('window-toggle-maximize'),
  closeAppWindow: () => ipcRenderer.invoke('window-close'),
});

export {};
declare global {
  interface Window {
    electron: {
      getImportCsvPath: () => Promise<string | null>;
      showOpenDirectoryDialog: () => Promise<string | null>;
      minimizeAppWindow: () => void;
      toggleMaximizeAppWindow: () => void;
      closeAppWindow: () => void;
    };
  }
}
