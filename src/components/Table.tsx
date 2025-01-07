import { JSX, useEffect, useReducer, useRef} from "react";
import { Card, CardColor, CardsUpdate, ClientSidePlayer, CSPlayersSync, PlayerIndexSync, ServerEvent, ServerEventType } from "../types";
import { useNavigate } from "react-router-dom";
import tableReducer, {TableActionData, TableActionType, TableState} from "../reducer";

export default function (): JSX.Element {
    const playerIndexRef = useRef<number|null>(null);
    const navigate = useNavigate();
    const [state, dispatcher] = useReducer(tableReducer, {
        cards: [],
        currentPlayer: 0,
        players: new Map<number, ClientSidePlayer>(),
        isDirectionChanged: false,
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
                    data: data as TableActionData
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
        <></>
    );
}