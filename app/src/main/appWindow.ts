import { app, BrowserWindow } from 'electron';
import { registerMainIPC } from './registerMainIPC';

// Electron Forge automatically creates these entry points
declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;

export const createAppWindow = (): BrowserWindow => {
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 750,
    minHeight: 600,
    show: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      sandbox: true,
      nodeIntegration: false,
      nativeWindowOpen: true,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

  appWindow.on('ready-to-show', () => appWindow.show());

  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });

  registerMainIPC(appWindow);

  return appWindow;
};
