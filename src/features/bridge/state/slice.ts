import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { drawCardsRequest, shuffleNewCardsRequest } from '~/features/bridge/api';

import { CardInstanceType, DrawCardsPayloadType, ShuffleCardsPayloadType } from '~/features/bridge/types';

const ACTION_PREFIX = 'bridge';

type RequestStatusType = 'loading' | 'error' | 'success';

type GameStatusType = 'playing' | 'win' | 'lose' | 'draw';

export type PlayerCardType = 'left' | 'right';

export type BridgeStateType = {
    request: {
        status: Nullable<RequestStatusType>;
        message: Nullable<string>;
    };
    gameStatus: Nullable<GameStatusType>;
    playerCard: Nullable<PlayerCardType>;
    deckId: string;
    cards: Nullable<{
        left: CardInstanceType;
        right: CardInstanceType;
    }>;
};

const initialState: BridgeStateType = {
    request: {
        status: null,
        message: '',
    },
    gameStatus: null,
    playerCard: null,
    deckId: '',
    cards: null,
};

export const shuffleNewCards = createAsyncThunk(`${ACTION_PREFIX}/shuffleNewCards`, () =>
    shuffleNewCardsRequest().then((res) => res.data),
);

export const drawCards = createAsyncThunk(`${ACTION_PREFIX}/drawCards`, (deckId: string) =>
    drawCardsRequest(deckId).then((res) => res.data),
);

const bridgeSlice = createSlice({
    name: ACTION_PREFIX,
    initialState,
    reducers: {
        setPlayerCard: (state, { payload }: PayloadAction<PlayerCardType>) => {
            state.playerCard = payload;
        },
        setGameStatus: (state, { payload }: PayloadAction<GameStatusType>) => {
            state.gameStatus = payload;
        },
        resetGame: (state) => {
            state.gameStatus = null;
            state.cards = null;
        },
    },
    extraReducers: {
        [shuffleNewCards.pending.type]: (state: BridgeStateType) => {
            state.request.status = 'loading';
        },
        [shuffleNewCards.fulfilled.type]: (state, { payload }: PayloadAction<ShuffleCardsPayloadType>) => {
            state.request.status = 'success';
            state.deckId = payload.deck_id;

            state.request.message = null;
        },
        [shuffleNewCards.rejected.type]: (state) => {
            state.request.status = 'error';
            state.request.message = 'Something went wrong, try again.';
        },
        [drawCards.pending.type]: (state: BridgeStateType) => {
            state.request.status = 'loading';
            state.request.message = null;
        },
        [drawCards.fulfilled.type]: (state, { payload }: PayloadAction<DrawCardsPayloadType>) => {
            const [left, right] = payload.cards;

            state.cards = { left, right };
            state.deckId = payload.deckId;
            state.request.status = 'success';
        },
        [drawCards.rejected.type]: (state) => {
            state.request.status = 'error';
        },
    },
});

export const { setPlayerCard, setGameStatus, resetGame } = bridgeSlice.actions;

export default bridgeSlice.reducer;
