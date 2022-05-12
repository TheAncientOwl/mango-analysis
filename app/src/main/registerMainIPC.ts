import { BrowserWindow, ipcMain, dialog, app } from 'electron';
import fs from 'fs';
import path from 'path';

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

  ipcMain.handle('get-home-dir', () => app.getPath('home'));

  ipcMain.handle('get-app-data-path', () => path.resolve(app.getPath('home'), '.mango-analysis'));

  ipcMain.handle('resolve', (event, part1: string, part2: string) => {
    return path.resolve(part1, part2);
  });
};
