import { Card, CardColor, CardCountUpdate, CardsUpdate, ClientSidePlayer, CSPlayersSync, DirectionUpdate, PlayerTurnUpdate, StackColorUpdate, StackTopUpdate } from "./types";

export interface TableAction {
    type: TableActionType;
    payload: TableActionData;
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

export type TableActionData = CSPlayersSync | StackTopUpdate | CardsUpdate | CardCountUpdate | DirectionUpdate | PlayerTurnUpdate | StackColorUpdate;

export default function tableReducer(state: TableState, action: TableAction): TableState {
    switch (action.type) {
        case TableActionType.CSPlayersSync:
            return {
                ...state,
                players: new Map<number, ClientSidePlayer>((action.payload as CSPlayersSync).players.map(player => [player.index, player])),
            }
        case TableActionType.CardsUpdate:
            return {
                ...state,
                cards: (action.payload as CardsUpdate).cards
            }
        case TableActionType.DirectionUpdate:
            return {
                ...state,
                isDirectionReversed: (action.payload as DirectionUpdate).isReversed
            }
        case TableActionType.PlayerTurnUpdate:
            return {
                ...state,
                currentPlayer: (action.payload as PlayerTurnUpdate).currentPlayerIndex
            }
        case TableActionType.StackTopUpdate:
            const {card} = action.payload as StackTopUpdate;
            return {
                ...state,
                stackTop: card,
                stackColor: card.color
            }
        case TableActionType.StackColorUpdate:
            return {
                ...state,
                stackColor: (action.payload as StackColorUpdate).color
            }
        case TableActionType.CardCountUpdate:
            const {count, playerIndex} = action.payload as CardCountUpdate;
            const player = state.players.get(playerIndex)!;
            player.cardCount = count;
            return {...state}
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
}

export interface TableState {
    cards: Card[];
    isDirectionReversed: boolean;
    currentPlayer: number;
    players: Map<number, ClientSidePlayer>;
    stackTop: Card | null;
    stackColor: CardColor | null;
}