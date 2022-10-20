import { useNavigate } from 'react-router-dom';

import { removeFromLocalStorage } from '~/common/utils';

import { USER_AUTH_KEY } from '~/features/auth/constants';
import { routePaths } from '~/routing/constants';

type PayloadType = () => void;

export const useLogout = (): PayloadType => {
    const navigate = useNavigate();

    const handleLogout = (): void => {
        removeFromLocalStorage(USER_AUTH_KEY);
        navigate(routePaths.login());
    };

    return handleLogout;
};
