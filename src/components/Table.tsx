import { JSX, useEffect, useReducer, useState} from "react";
import { ClientSidePlayer, PlayerIndexSync, ServerEvent, ServerEventType, CardColor, ClientAction, PlayerSkipped, CardValidity, PlayerOut, InvalidAction } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import tableReducer, {TableActionData, TableActionType} from "../tableReducer";
import Players from "./Players";
import PlayerCards from "./PlayerCards";
import UiCard from "./UiCard";
import { SocketContext } from "../socketContext";
import ColorPicker from "./ColorPicker";

export default function (): JSX.Element {
    const [playerIndex, setPlayerIndex] = useState<number|null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [socketContextValue, setSocketContextValue] = useState<((action: ClientAction) => void)|null>(null);
    const [state, dispatcher] = useReducer(tableReducer, {
        cards: [],
        currentPlayer: 0,
        players: new Map<number, ClientSidePlayer>(),
        isDirectionReversed: false,
        stackTop: null,
        stackColor: null,
    });
    const [log, setLog] = useState<string>('');
    const [isColorPickerVis, setIsColorPickerVis] = useState<boolean>(false);

    function logMessage(message: string): void {
        setLog(prev => `${prev}${message}\n`);
    }

    function isYourTurn(): boolean {
        return state.currentPlayer === playerIndex;
    }

    useEffect(() => {
        if (!localStorage.getItem('name')) navigate('/name');
        const socket = new WebSocket(import.meta.env.VITE_WS_URL);
        
        socket.onopen = () => {
            setSocketContextValue(() => {
                return function (action: ClientAction): void {
                    if (!action) throw 'not working';
                    socket.send(JSON.stringify(action));
                }
            });
        }

        socket.onmessage = (message: MessageEvent) => {
            const {type, data} = JSON.parse(message.data) as ServerEvent;

            function dispatchWithData(type: TableActionType) {
                dispatcher({
                    type,
                    payload: data as TableActionData
                });
            }

            switch (type) {
                case ServerEventType.InvalidAction:
                    alert(data as InvalidAction ?? 'action is invalid');
                    break;
                case ServerEventType.PlayerIndexSync:
                    setPlayerIndex((data as PlayerIndexSync).playerIndex);
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
                    const {isValid} = data as CardValidity;
                    if (!isValid) logMessage('That card is not valid!');
                    break;
                case ServerEventType.PlayerOut: {
                    const {playerIndex} = data as PlayerOut;
                    logMessage(`${state.players.get(playerIndex)!.name} has won!`);
                    break;
                }
                case ServerEventType.PlayerSkipped:
                    const {playerIndex} = data as PlayerSkipped;
                    logMessage(`${state.players.get(playerIndex)!.name} was skipped!`);
                    break;
                case ServerEventType.GameStarted:
                    logMessage('Game has begun!');
                    break;
                case ServerEventType.GameEnded:
                    alert('Game has ended!');
                    break;
                case ServerEventType.CardSubmissionRequired:
                    // no-op
                    break;
                case ServerEventType.ColorChoiceRequired:
                    setIsColorPickerVis(true);
                    break;
                default:
                    console.log(ServerEventType[type]);
                    break;
            }
        };
    }, []);

    if (!socketContextValue) return <>Connecting to server...</>;

    return (
        <SocketContext.Provider value={socketContextValue!}>
            <h5>Lobby Id: {location.state.lobbyId} | Lobby Capacity: {location.state.lobbyCapacity}</h5>
            {playerIndex !== null ? (<Players players={Array.from(state.players.values())} playerIndex={playerIndex}
                currPlayerIndex={state.currentPlayer}
            />) : <></>}
            {isYourTurn() && <p style={{ color: 'red' }}>It's your turn!!!</p>}
            {isColorPickerVis && <ColorPicker setIsColorPickerVis={setIsColorPickerVis} />}
            <PlayerCards cards={state.cards} checkTurn={isYourTurn} />
            <p>Stack direction is {state.isDirectionReversed ? 'clockwise' : 'anti-clockwise'}</p>
            <p>Stack top: {state.stackTop ? <UiCard onClick={undefined} card={state.stackTop}/> : 'null'}</p>
            <p>Stack color: {CardColor[state.stackColor ?? -1] || 'null'}</p>
            <pre style={{ lineHeight: '24px' }}>{log}</pre>
        </SocketContext.Provider>
    );
}