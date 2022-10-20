import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from '~/routing/components/AppRoutes';

import store from './state/store';

import './index.css';

const App: React.FC = () => (
    <Provider store={store}>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </Provider>
);

export default App;
