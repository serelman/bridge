import React from 'react';

import { AuthForm } from '~/features/auth/components';

import './assets/index.css';

const LoginPage: React.FC = () => (
    <div className="auth-page">
        <div className="auth-page__content">
            <AuthForm />
        </div>
    </div>
);

export default LoginPage;
