import { contextBridge } from 'electron';
import { dialog } from '@electron/remote';

const showOpenCsvDialog = async (): Promise<string | null> => {
  const value = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Csv', extensions: ['csv'] }],
  });

  if (value.canceled) return null;

  return value.filePaths[0];
};

const showOpenDirectoryDialog = async (): Promise<string | null> => {
  const value = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });

  if (value.canceled) return null;

  return value.filePaths[0];
};

contextBridge.exposeInMainWorld('electronAPI', { showOpenCsvDialog, showOpenDirectoryDialog });
