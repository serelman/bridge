import React from 'react';

import { Link } from 'react-router-dom';

import { routePaths } from '~/routing/constants';

import './assets/index.css';

const ErrorPage: React.FC = () => (
    <div className="error-page">
        <h4>404 Not Found!</h4>
        <Link to={routePaths.home()}>Home</Link>
    </div>
);

export default ErrorPage;
