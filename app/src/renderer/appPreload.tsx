import { contextBridge, ipcRenderer } from 'electron';
import { dialog } from '@electron/remote';

contextBridge.exposeInMainWorld('electron', {
  showOpenCsvDialog: async (): Promise<string | null> => {
    const value = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Csv', extensions: ['csv'] }],
    });

    if (value.canceled) return null;

    return value.filePaths[0];
  },

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
      showOpenCsvDialog: () => Promise<string | null>;
      showOpenDirectoryDialog: () => Promise<string | null>;
      minimizeAppWindow: () => void;
      toggleMaximizeAppWindow: () => void;
      closeAppWindow: () => void;
    };
  }
}
