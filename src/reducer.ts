import { Card, CardColor, CardCountUpdate, CardsUpdate, ClientSidePlayer, DirectionUpdate, PlayerTurnUpdate, StackColorUpdate, StackTopUpdate } from "./types";

export interface TableAction {
    type: TableActionType;
    data: TableActionData;
}

export enum TableActionType {
    CSPlayersSync,
    CardsUpdate,
    StackTopUpdate,
    CardCountUpdate,
    DirectionUpdate,
    PlayerTurnUpdate,
    StackColorUpdate,
}

export type TableActionData = StackTopUpdate | CardsUpdate | CardCountUpdate | DirectionUpdate | PlayerTurnUpdate | StackColorUpdate;

export default function tableReducer(state: TableState, action: TableAction): TableState {
    switch (action.type) {
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
}

export interface TableState {
    cards: Card[];
    isDirectionChanged: boolean;
    currentPlayer: number;
    players: Map<number, ClientSidePlayer>;
    stackTop: Card | null;
    stackColor: CardColor | null;
}