import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '~/state/store';

import { BalanceStateType } from '~/features/balance/types';

export const selectBridgeState = (state: RootState): BalanceStateType => state.balance;

export const selectBalance = createSelector(selectBridgeState, (balance) => balance.amount);
export const selectLastReward = createSelector(selectBridgeState, (balance) => balance.lastReward);
