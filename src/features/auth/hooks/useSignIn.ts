import { useNavigate } from 'react-router-dom';

import { setToLocalStorage } from '~/common/utils';

import { USER_AUTH_KEY, users } from '~/features/auth/constants';
import { routePaths } from '~/routing/constants';

type PayloadType = (username: string, password: string) => void;

export const useSignIn = (): PayloadType => {
    const navigate = useNavigate();

    const signIn = (username: string, password: string): void => {
        if (!username || !password) return;

        const isUserExist = users.find((user) => user.username === username && user.password === password);

        if (isUserExist) {
            setToLocalStorage(USER_AUTH_KEY, 'true');
            navigate(routePaths.home());
        } else {
            throw Error('Имя пользователя или пароль введены не верно');
        }
    };

    return signIn;
};
