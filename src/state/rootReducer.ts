import balanceSlice from '~/features/balance/state/slice';
import bridgeSlice from '~/features/bridge/state/slice';

export const rootReducer = {
    bridge: bridgeSlice,
    balance: balanceSlice,
};
