import { JSX, useEffect, useReducer, useState } from 'react';
import {
    ClientSidePlayer,
    PlayerIndexSync,
    ServerEvent,
    ServerEventType,
    ClientAction,
    PlayerSkipped,
    CardValidity,
    PlayerOut,
    InvalidAction,
} from '../../types';
import { useNavigate } from 'react-router-dom';
import tableReducer, {
    TableActionData,
    TableActionType,
} from '../../tableReducer';
import { SocketContext } from '../../socketContext';
import TableUi from './TableUi';

export default function (): JSX.Element {
    const [playerIndex, setPlayerIndex] = useState<number | null>(null);
    const navigate = useNavigate();
    const [socketContextValue, setSocketContextValue] = useState<
        ((action: ClientAction) => void) | null
    >(null);
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
        setLog((prev) => `${message}\n${prev}`);
    }

    useEffect(() => {
        if (!localStorage.getItem('name')) navigate('/name');
        const socket = new WebSocket(import.meta.env.VITE_WS_URL);

        socket.onopen = () => {
            setSocketContextValue(() => {
                return function (action: ClientAction): void {
                    socket.send(JSON.stringify(action));
                };
            });
        };

        socket.onmessage = (message: MessageEvent) => {
            const { type, data } = JSON.parse(message.data) as ServerEvent;

            function dispatchWithData(type: TableActionType) {
                dispatcher({
                    type,
                    payload: data as TableActionData,
                });
            }

            switch (type) {
                case ServerEventType.InvalidAction:
                    alert((data as InvalidAction) ?? 'action is invalid');
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
                case ServerEventType.PlayerIndexSync:
                    setPlayerIndex((data as PlayerIndexSync).playerIndex);
                    break;
                case ServerEventType.CardValidity:
                    const { isValid } = data as CardValidity;
                    if (!isValid) logMessage('That card is not valid!');
                    break;
                case ServerEventType.PlayerOut: {
                    const { playerIndex } = data as PlayerOut;
                    alert(`${state.players.get(playerIndex)!.name} has won!`);
                    break;
                }
                case ServerEventType.PlayerSkipped:
                    const { playerIndex } = data as PlayerSkipped;
                    logMessage(
                        `${state.players.get(playerIndex)!.name} was skipped!`
                    );
                    break;
                case ServerEventType.GameStarted:
                    logMessage('Game has begun!');
                    break;
                case ServerEventType.GameEnded:
                    logMessage('Game has ended!');
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
            <TableUi
                state={state}
                playerIndex={playerIndex!}
                isColorPickerVis={isColorPickerVis}
                setIsColorPickerVis={setIsColorPickerVis}
                log={log}
            />
        </SocketContext.Provider>
    );
}
