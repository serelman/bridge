import React from 'react';

import classNames from 'classnames';

import questionMarkBackground from './assets/images/question_mark.png';

import './assets/index.css';

type PropsType = {
    image: string;
};

export const BridgeCard: React.FC<PropsType> = ({ image }) => (
    <div
        className={classNames('bridge-card', { 'bridge-card--flipped': !image })}
        style={{ backgroundImage: image ? `url('${image}')` : `url('${questionMarkBackground}')` }}
    />
);
