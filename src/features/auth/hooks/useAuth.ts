import { getFromLocalStorage } from '~/common/utils';

import { USER_AUTH_KEY } from '~/features/auth/constants';

export const useAuth = (): boolean => {
    const isAuthenticated = Boolean(getFromLocalStorage(USER_AUTH_KEY));

    return isAuthenticated;
};
