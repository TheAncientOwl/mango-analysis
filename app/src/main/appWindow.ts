import { app, ipcMain, BrowserWindow } from 'electron';
require('@electron/remote/main').initialize();

// Electron Forge automatically creates these entry points
declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;

/**
 * Create Application Window
 * @returns {BrowserWindow} Application Window Instance
 */
export const createAppWindow = (): BrowserWindow => {
  // Create new window instance
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 700,
    minHeight: 600,
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
  require('@electron/remote/main').enable(appWindow.webContents);

  // Load the index.html of the app window.
  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

  // Show window when its ready to
  appWindow.on('ready-to-show', () => appWindow.show());

  // Close all windows when main window is closed
  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });

  // Register Inter Process Communication for main process
  registerMainIPC();

  return appWindow;
};

/**
 * Register Inter Process Communication
 */
const registerMainIPC = (): void => {
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
};
