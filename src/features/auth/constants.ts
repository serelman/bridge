type UserType = {
    username: string;
    password: string;
};

export const users: Array<UserType> = [
    {
        username: 'admin',
        password: '123456',
    },
];

export const USER_AUTH_KEY = 'auth';

export const MIN_USERNAME_LENGTH = 5;
export const MAX_USERNAME_LENGTH = 32;

export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 32;
