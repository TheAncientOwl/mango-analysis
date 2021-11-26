import React from 'react';
import { hot } from 'react-hot-loader';
import './Application.css';

const Application: React.FC = () => {
  return (
    <div className='main'>
      <h1>⚡ Hello world! ⚡</h1>

      <div className='tech'>
        🗲
        {['Electron', 'React', 'Typescript', 'Webpack'].map((item, index) => {
          return (
            <React.Fragment key={index}>
              <span className='part color-primary'>{item}</span>-
            </React.Fragment>
          );
        })}
        <span className='part color-secondary'>boilerplate</span>
        🗲
      </div>

      <div className='info'>
        <h4 className='info-header'>You can start by editing:</h4>
        <ul className='files'>
          {[
            { file: '/src/main/app.ts', desc: 'electron entry point' },
            { file: '/src/renderer/appRenderer.tsx', desc: 'react frontend entry point' },
            { file: '/src/renderer/appPreload.ts', desc: 'preload script entry point' },
          ].map((item, index) => (
            <li key={index} className='file'>
              <span className='li-file'>{item.file}</span>
              <span className='li-separator'>»</span>
              <span className='li-file-desc'>{item.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default hot(module)(Application);
