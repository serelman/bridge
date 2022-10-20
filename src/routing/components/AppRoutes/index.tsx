import React from 'react';

import { Routes, Route } from 'react-router-dom';

import { ErrorPage, HomePage, LoginPage } from '~/pages';
import { AnonymousRoute, PrivateRoute } from '~/routing/components';

import { routePaths } from '~/routing/constants';

const AppRoutes: React.FC = () => (
    <Routes>
        <Route element={<AnonymousRoute />}>
            <Route path={routePaths.login()} element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
            <Route path={routePaths.home()} element={<HomePage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
    </Routes>
);

export default AppRoutes;
