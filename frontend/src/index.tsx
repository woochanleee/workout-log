import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import dotenv from 'dotenv';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

dotenv.config();

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root'),
);
serviceWorker.unregister();
