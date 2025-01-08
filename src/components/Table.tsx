import { JSX, useEffect, useReducer, useRef} from "react";
import { ClientSidePlayer, PlayerIndexSync, ServerEvent, ServerEventType } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import tableReducer, {TableActionData, TableActionType} from "../tableReducer";
import Players from "./Players";
import PlayerCards from "./PlayerCards";
import UiCard from "./UiCard";

export default function (): JSX.Element {
    const playerIndexRef = useRef<number|null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [state, dispatcher] = useReducer(tableReducer, {
        cards: [],
        currentPlayer: 0,
        players: new Map<number, ClientSidePlayer>(),
        isDirectionReversed: false,
        stackTop: null,
        stackColor: null,
    });
    
    useEffect(() => {
        if (!localStorage.getItem('name')) navigate('/name');
        const socket = new WebSocket(import.meta.env.VITE_WS_URL);

        socket.onmessage = (message: MessageEvent) => {
            const {type, data} = JSON.parse(message.data) as ServerEvent;

            function dispatchWithData(type: TableActionType) {
                dispatcher({
                    type,
                    payload: data as TableActionData
                });
            }

            switch (type) {
                case ServerEventType.PlayerIndexSync:
                    playerIndexRef.current = (data as PlayerIndexSync).playerIndex;
                    break;
                case ServerEventType.CSPlayersSync:
                    dispatchWithData(TableActionType.CSPlayersSync);
                    break;
                case ServerEventType.CardsUpdate:
                    dispatchWithData(TableActionType.CardsUpdate);
                    break;
                case ServerEventType.StackTopUpdate:
                    dispatchWithData(TableActionType.StackTopUpdate);
                    break;
                case ServerEventType.CardCountUpdate:
                    dispatchWithData(TableActionType.CardCountUpdate);
                    break;
                case ServerEventType.DirectionUpdate:
                    dispatchWithData(TableActionType.DirectionUpdate);
                    break;
                case ServerEventType.PlayerTurnUpdate:
                    dispatchWithData(TableActionType.PlayerTurnUpdate);
                    break;
                case ServerEventType.StackColorUpdate:
                    dispatchWithData(TableActionType.StackColorUpdate);
                    break;
                case ServerEventType.CardValidity:
                    // Handle CardValidity
                    break;
                case ServerEventType.PlayerOut:
                    // Handle PlayerOut
                    break;
                case ServerEventType.PlayerSkipped:
                    // Handle PlayerSkipped
                    break;
                case ServerEventType.GameStarted:
                    // Handle GameStarted
                    break;
                case ServerEventType.GameEnded:
                    // Handle GameEnded
                    break;
                case ServerEventType.CardSubmissionRequired:
                    // Handle CardSubmissionRequired
                    break;
                case ServerEventType.ColorChoiceRequired:
                    // Handle ColorChoiceRequired
                    break;
                default:
                    console.log(type);
                    break;
            }
        };
    }, []);

    return (
        <>
            <h5>Lobby Id: {location.state.lobbyId} | Lobby Capacity: {location.state.lobbyCapacity}</h5>
            {playerIndexRef.current && <Players players={Array.from(state.players.values())} playerIndex={playerIndexRef.current}
                currPlayerIndex={state.currentPlayer}
            />}
            <PlayerCards cards={state.cards} />
            <p>Stack direction is {state.isDirectionReversed ? 'clockwise' : 'anti-clockwise'}</p>
            <p>Stack top: {state.stackTop ? <UiCard card={state.stackTop}/> : 'null'}</p>
            <p>Stack color: {state.stackColor || 'null'}</p>
        </>
    );
}