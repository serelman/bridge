import React from 'react';

import { useSelector } from 'react-redux';

import { selectBalance } from '~/features/balance/state/selectors';

import './assets/index.css';

export const BridgeBalance: React.FC = () => {
    const balance = useSelector(selectBalance);

    return (
        <div className="p-4 text-center">
            <h4>Balance: ${balance}</h4>
        </div>
    );
};
