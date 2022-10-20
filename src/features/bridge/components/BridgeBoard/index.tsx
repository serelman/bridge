import React, { useEffect } from 'react';

import classNames from 'classnames';
import { Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { BridgeCard } from '~/features/bridge/components/BridgeCard';

import { AppDispatch } from '~/state/store';

import { BET_VALUE, CARD_VALUES, REWARD } from '~/features/bridge/constants';

import { PlayerCardType } from '~/features/bridge/types';

import { decreaseBalance, increaseBalance } from '~/features/balance/state/slice';
import {
    selectCards,
    selectDeckId,
    selectGameStatus,
    selectBridgeRequestState,
    selectPlayerCard,
} from '~/features/bridge/state/selectors';
import { drawCards, resetGame, setGameStatus, shuffleNewCards, setPlayerCard } from '~/features/bridge/state/slice';

import './assets/index.css';

export const BridgeBoard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cards = useSelector(selectCards);
    const deckId = useSelector(selectDeckId);
    const playerCard = useSelector(selectPlayerCard);

    const { isLoading } = useSelector(selectBridgeRequestState);
    const { isGameStarted, isGameFinished, isPlayerWinner } = useSelector(selectGameStatus);

    const handlePlayButtonClick = (): void => {
        dispatch(shuffleNewCards());
        dispatch(decreaseBalance(BET_VALUE));
        dispatch(setGameStatus('playing'));
    };

    const handleResetButton = (): void => {
        dispatch(resetGame());
    };

    const handleSideButtonClick = (e: React.MouseEvent<HTMLElement>): void => {
        dispatch(setPlayerCard(e.currentTarget.id as PlayerCardType));
        dispatch(drawCards(deckId));
    };

    const calculateGameResult = (): void => {
        if (!cards || !playerCard) return;

        const { left, right } = cards;

        const isDraw = CARD_VALUES[left.value] === CARD_VALUES[right.value];
        const isLeftWinner = CARD_VALUES[left.value] > CARD_VALUES[right.value];

        if (isDraw) dispatch(setGameStatus('draw'));
        else if (playerCard === 'left' && isLeftWinner) dispatch(setGameStatus('win'));
        else if (playerCard === 'right' && !isLeftWinner) dispatch(setGameStatus('win'));
        else dispatch(setGameStatus('lose'));
    };

    useEffect(() => {
        calculateGameResult();
    }, [cards]);

    useEffect(() => {
        if (isPlayerWinner) dispatch(increaseBalance(REWARD));
    }, [isPlayerWinner]);

    const buttonsWrapClassNames = classNames(
        ['bridge-board__buttons-wrap', 'd-flex', 'w-100', 'align-items-center', 'px-4'],
        {
            'justify-content-center': !isGameStarted || isGameFinished,
            'justify-content-between': isGameStarted,
        },
    );

    return (
        <div className="bridge-board ">
            <BridgeCard image={cards?.left.image ?? ''} />

            {isLoading && (
                <div className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" />
                </div>
            )}
            {!isLoading && (
                <div className={buttonsWrapClassNames}>
                    {!isGameFinished && !isGameStarted && <Button onClick={handlePlayButtonClick}>Играть</Button>}
                    {!isGameFinished && isGameStarted && (
                        <>
                            <Button id="left" onClick={handleSideButtonClick}>
                                Слева
                            </Button>
                            <Button id="right" onClick={handleSideButtonClick}>
                                Справа
                            </Button>
                        </>
                    )}
                    {isGameFinished && <Button onClick={handleResetButton}>Играть ещё</Button>}
                </div>
            )}
            <BridgeCard image={cards?.right.image ?? ''} />
        </div>
    );
};
