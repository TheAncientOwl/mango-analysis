import { BrowserWindow, ipcMain, dialog } from 'electron';

export const registerMainIPC = (appWindow: BrowserWindow): void => {
  ipcMain.handle('window-minimize', () => {
    appWindow.minimize();
  });

  ipcMain.handle('window-toggle-maximize', () => {
    if (appWindow.isMaximized()) {
      appWindow.unmaximize();
    } else {
      appWindow.maximize();
    }
  });

  ipcMain.handle('window-close', () => {
    appWindow.close();
  });

  ipcMain.handle('get-import-csv-path', async (): Promise<string | null> => {
    const value = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Csv', extensions: ['csv'] }],
    });

    if (value.canceled) return null;

    return value.filePaths[0];
  });

  ipcMain.handle('get-export-csv-directory-path', async (): Promise<string | null> => {
    const value = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });

    if (value.canceled) return null;

    return value.filePaths[0];
  });
};
