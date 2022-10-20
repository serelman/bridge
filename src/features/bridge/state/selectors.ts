import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '~/state/store';

import { BridgeStateType } from '~/features/bridge/state/slice';

export const selectBridgeState = (state: RootState): BridgeStateType => state.bridge;

export const selectDeckId = createSelector(selectBridgeState, (state: BridgeStateType) => state.deckId);
export const selectPlayerCard = createSelector(selectBridgeState, (state: BridgeStateType) => state.playerCard);
export const selectCards = createSelector(selectBridgeState, (state: BridgeStateType) => state.cards);

export const selectBridgeRequestState = createSelector(selectBridgeState, (state: BridgeStateType) => ({
    isLoading: state.request.status === 'loading',
    message: state.request.message,
}));

export const selectGameStatus = createSelector(selectBridgeState, ({ gameStatus }) => ({
    isGameStarted: gameStatus === 'playing',
    isGameFinished: gameStatus === 'win' || gameStatus === 'lose' || gameStatus === 'draw',
    isPlayerWinner: gameStatus === 'win',
    isDraw: gameStatus === 'draw',
}));
