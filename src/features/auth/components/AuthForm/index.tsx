import React, { useState } from 'react';

import { ErrorMessage, Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';

import { AuthFormSchema } from '~/features/auth/schema';

import { useSignIn } from '~/features/auth/hooks/useSignIn';

import './assets/index.css';

export const AuthForm: React.FC = () => {
    const signIn = useSignIn();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const initialValues = { username: '', password: '' };

    const onSubmit = (values: typeof initialValues): void => {
        try {
            signIn(values.username, values.password);
        } catch (err) {
            if (err instanceof Error) setErrorMessage(err.message);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={AuthFormSchema}>
            {({ handleSubmit, handleChange }): React.ReactNode => (
                <Form className="auth-form" onSubmit={handleSubmit}>
                    {errorMessage && <h6 className="text-danger">{errorMessage}</h6>}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={handleChange} name="username" type="username" placeholder="Username" />
                        <ErrorMessage name="username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
                        <ErrorMessage name="password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
