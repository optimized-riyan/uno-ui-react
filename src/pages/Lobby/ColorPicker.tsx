import {CSSProperties, useContext, type JSX} from 'react';
import { SocketContext } from '../../socketContext';
import { CardColor, ClientActionType, PickColor } from '../../types';

export default function ColorPicker(props: {setIsColorPickerVis: React.Dispatch<React.SetStateAction<boolean>>}): JSX.Element {
    const sendAction = useContext(SocketContext)!;

    function liStyle(cardColor: CardColor): CSSProperties {
        const getColor = (cardColor: CardColor) => {
            switch (cardColor) {
                case CardColor.Red: return '#eb606f';
                case CardColor.Green: return '#44db8e';
                case CardColor.Blue: return '#3574ec';
                case CardColor.Yellow: return '#f1c74d';
            }
        };

        return {
            height: '2rem',
            aspectRatio: '1',
            backgroundColor: getColor(cardColor),
        }
    }

    function sendPickColorAction(color: CardColor) {
        sendAction({
            type: ClientActionType.PickColor,
            data: {color} as PickColor
        });
        props.setIsColorPickerVis(false);
    }

    return (
        <div>
            Pick a color:
            <ul style={{ listStyle: 'none', display: 'flex' }}>
                {[CardColor.Red, CardColor.Green, CardColor.Blue, CardColor.Yellow].map(
                    (color, index) => {
                        return <li key={index} style={liStyle(color)} onClick={() => sendPickColorAction(color)}></li>
                    }
                )}
            </ul>
        </div>
    );
}