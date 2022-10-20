import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INITIAL_BALANCE_VALUE } from '~/features/bridge/constants';

const ACTION_PREFIX = 'balance';

export type BalanceStateType = {
    lastReward: Nullable<number>;
    amount: number;
};

const initialState: BalanceStateType = {
    amount: INITIAL_BALANCE_VALUE,
    lastReward: null,
};

const balanceSlice = createSlice({
    name: ACTION_PREFIX,
    initialState,
    reducers: {
        increaseBalance: (state, { payload }: PayloadAction<number>) => {
            state.amount += payload;
            state.lastReward = payload;
        },
        decreaseBalance: (state, { payload }: PayloadAction<number>) => {
            state.amount -= payload;
        },
    },
});

export const { increaseBalance, decreaseBalance } = balanceSlice.actions;

export default balanceSlice.reducer;
