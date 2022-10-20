import React from 'react';

import { Container } from 'react-bootstrap';

import { Header } from '~/common/components';
import { BridgeBalance, BridgeBoard, BridgeMessages } from '~/features/bridge/components';

import './assets/index.css';

const HomePage: React.FC = () => (
    <div className="home-page">
        <Header />
        <div className="home-page__content">
            <Container>
                <BridgeBalance />
                <BridgeMessages />
                <BridgeBoard />
            </Container>
        </div>
    </div>
);

export default HomePage;
