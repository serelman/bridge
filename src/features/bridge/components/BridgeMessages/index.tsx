import React from 'react';

import { useSelector } from 'react-redux';

import { selectLastReward } from '~/features/balance/state/selectors';
import { selectBridgeRequestState, selectGameStatus } from '~/features/bridge/state/selectors';

import './assets/index.css';

export const BridgeMessages: React.FC = () => {
    const lastReward = useSelector(selectLastReward);
    const { isDraw, isGameFinished, isPlayerWinner } = useSelector(selectGameStatus);
    const { message: errorMessage } = useSelector(selectBridgeRequestState);

    const isShowGreetingMessage = !isDraw && !isGameFinished;
    const isShowWinMessage = !isDraw && isGameFinished && isPlayerWinner && lastReward;
    const isLoseMessage = !isDraw && isGameFinished && !isPlayerWinner;

    return (
        <div className="bridge-messages text-center">
            {isShowWinMessage && <h3>Вы выиграли ${lastReward}</h3>}
            {isShowWinMessage && <h5 className="text-black-50">Хотите сыграть ещё раз?</h5>}

            {isLoseMessage && <h3>Вы проиграли :(</h3>}

            {isDraw && <h3>Ничья!(</h3>}

            {isShowGreetingMessage && <h3>Кто выиграет?</h3>}
            {isShowGreetingMessage && <h5 className="text-black-50">Сыграй в игру и испытай удачу</h5>}

            {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
    );
};
