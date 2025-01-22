import { CSSProperties, ReactNode } from "react"
import { CardColor } from "../../types";
import ColorPicker from "./ColorPicker";
import PlayerCards from "./PlayerCards";
import Players from "./Players";
import UiCard from "../../components/UiCard";
import { TableState } from "../../tableReducer";
import { useLocation } from "react-router-dom";
import Table from "./Table";

export default function LobbyUi({state, playerIndex, isColorPickerVis, setIsColorPickerVis, log}: TableUiProps): ReactNode {
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
        <div style={{ width: 300, margin: 'auto' }}>
            <h5>Lobby Id: {location.state.lobbyId} | Lobby Capacity: {location.state.lobbyCapacity}</h5>
            <Table players={Array.from(state.players.values())} />
        </div>
    );
}

interface TableUiProps {
    state: TableState,
    playerIndex: number,
    isColorPickerVis: boolean,
    setIsColorPickerVis: React.Dispatch<React.SetStateAction<boolean>>,
    log: string
}