import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '~/features/auth/hooks';

import { routePaths } from '~/routing/constants';

const PrivateRoute: React.FC = () => {
    const isAuthenticated = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to={routePaths.login()} />;
};

export default PrivateRoute;
