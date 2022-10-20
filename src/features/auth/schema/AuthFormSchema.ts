import * as Yup from 'yup';

import {
    MAX_PASSWORD_LENGTH,
    MAX_USERNAME_LENGTH,
    MIN_PASSWORD_LENGTH,
    MIN_USERNAME_LENGTH,
} from '~/features/auth/constants';

export const AuthFormSchema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .min(MIN_USERNAME_LENGTH, `At least ${MIN_USERNAME_LENGTH} characters`)
        .max(MAX_USERNAME_LENGTH, `At most ${MAX_USERNAME_LENGTH} characters`)
        .required('Username is required'),
    password: Yup.string()
        .min(MIN_PASSWORD_LENGTH, `At least ${MIN_PASSWORD_LENGTH} characters`)
        .max(MAX_PASSWORD_LENGTH, `At most ${MAX_PASSWORD_LENGTH} characters`)
        .required('Password is required'),
});
