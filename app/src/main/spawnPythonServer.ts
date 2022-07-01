import { app } from 'electron';
import path from 'path';
import child_process from 'child_process';
import { inDev } from '@src/common/helpers';

let serverProcess: child_process.ChildProcess = null;

const startServer = () => {
  const executablePath = path.join(__dirname, 'python-build', 'mango-server.exe');

  serverProcess = child_process.execFile(executablePath);

  if (serverProcess == null) {
    console.error('Could not spawn the server');
  }

  console.log('\n\n\nPID:', serverProcess.pid);
};

const stopServer = () => {
  console.log('\n\n\nPID:', serverProcess.pid);
  serverProcess.kill();
  serverProcess = null;
};

export const setupPythonServer = () => {
  // if (inDev()) return;

  app.on('ready', startServer);
  app.on('will-quit', stopServer);
};
