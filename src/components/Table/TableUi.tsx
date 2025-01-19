import { CSSProperties, ReactNode } from "react"
import { CardColor } from "../../types";
import ColorPicker from "../ColorPicker";
import PlayerCards from "../PlayerCards";
import Players from "../Players";
import UiCard from "../UiCard";
import { TableState } from "../../tableReducer";
import { useLocation } from "react-router-dom";

export default function TableUi({state, playerIndex, isColorPickerVis, setIsColorPickerVis, log}: TableUiProps): ReactNode {
    const location = useLocation();
    
    function isYourTurn(): boolean {
        return state.currentPlayer === playerIndex;
    }

    const yourTurnStyle: CSSProperties = {
        color: 'red',
        height: '1rem',
        margin: '0',
        width: 'fit-content',
        backgroundColor: 'transparent',
    };

    function stackColorTextColor(cardColor: CardColor): string {
        switch (cardColor) {
            case CardColor.Red: return 'red';
            case CardColor.Green: return 'green';
            case CardColor.Blue: return 'blue';
            case CardColor.Yellow: return 'yellow';
            case CardColor.Black: return 'gray';
            default: return 'purple';
        }
    }

    return (
        <>
            <h5>Lobby Id: {location.state.lobbyId} | Lobby Capacity: {location.state.lobbyCapacity}</h5>
            {playerIndex !== null ? (<Players players={Array.from(state.players.values())} playerIndex={playerIndex}
                currPlayerIndex={state.currentPlayer}
            />) : <></>}
            <p style={yourTurnStyle}>{isYourTurn() ? 'It\'s your turn!!!' : ''}</p>
            {isColorPickerVis && <ColorPicker setIsColorPickerVis={setIsColorPickerVis} />}
            <PlayerCards cards={state.cards} checkTurn={isYourTurn} />
            <p>Stack direction is {state.isDirectionReversed ? 'clockwise' : 'anti-clockwise'}</p>
            <p>Stack top: {state.stackTop ? <UiCard onClick={undefined} card={state.stackTop}/> : 'null'}</p>
            <p style={{ color: stackColorTextColor(state.stackColor!) }}>Stack color: {CardColor[state.stackColor ?? -1] || 'null'}</p>
            <pre style={{ lineHeight: '24px' }}>{log}</pre>
        </>
    );
}

interface TableUiProps {
    state: TableState,
    playerIndex: number,
    isColorPickerVis: boolean,
    setIsColorPickerVis: React.Dispatch<React.SetStateAction<boolean>>,
    log: string
}