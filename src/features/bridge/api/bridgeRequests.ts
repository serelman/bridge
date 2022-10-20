import axios, { AxiosResponse } from 'axios';

import { CARD_VALUES } from '~/features/bridge/constants';

export type ShuffleCardsPayloadType = {
    success: boolean;
    deck_id: string;
};

export type CardInstanceType = {
    image: string;
    value: keyof typeof CARD_VALUES;
};

export type DrawCardsPayloadType = {
    deckId: string;
    cards: [CardInstanceType, CardInstanceType];
    remaining: number;
};

const BASE_URL = 'https://deckofcardsapi.com/api/deck';

const bridgeApi = axios.create({
    baseURL: BASE_URL,
});

export const shuffleNewCardsRequest = (): Promise<AxiosResponse<ShuffleCardsPayloadType>> =>
    bridgeApi.request({
        method: 'GET',
        url: '/new/shuffle/?deck_count=1',
    });

export const shuffleCardsRequest = (deckId: string): Promise<AxiosResponse<ShuffleCardsPayloadType>> =>
    bridgeApi.request({
        method: 'GET',
        url: `/${deckId}/shuffle`,
    });

export const drawCardsRequest = (deckId: string): Promise<AxiosResponse<DrawCardsPayloadType>> =>
    bridgeApi.request({
        method: 'GET',
        url: `/${deckId}/draw/?count=2`,
    });
