import { BrowserWindow, ipcMain, dialog } from 'electron';
import fs from 'fs';

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

  ipcMain.handle('show-save-dialog', async (event, options: Electron.SaveDialogOptions): Promise<string | null> => {
    const value = await dialog.showSaveDialog(options);

    if (value.canceled) return null;

    return value.filePath;
  });

  ipcMain.handle('copy-file-sync', (event, src: string, dest: string) => {
    fs.copyFileSync(src, dest);
  });
};
