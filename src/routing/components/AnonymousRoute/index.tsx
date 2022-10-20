import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '~/features/auth/hooks';

import { routePaths } from '~/routing/constants';

const AnonymousRoute: React.FC = () => {
    const isAuthenticated = useAuth();

    return isAuthenticated ? <Navigate to={routePaths.home()} /> : <Outlet />;
};

export default AnonymousRoute;
