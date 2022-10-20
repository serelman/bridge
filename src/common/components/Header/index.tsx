import React from 'react';

import { Button, Container, Navbar } from 'react-bootstrap';

import { useLogout } from '~/features/auth/hooks/useLogout';

import './assets/index.css';

export const Header: React.FC = () => {
    const logout = useLogout();

    return (
        <Navbar fixed="top" className="header navbar-dark">
            <Container>
                <Navbar.Text className="header__title">Bridge</Navbar.Text>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Button variant="outline-light" onClick={logout}>
                            Sign out
                        </Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
