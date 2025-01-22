import { Card, CardColor, CardValue } from '../types';
import back from '../assets/cards/back.svg';
import wild from '../assets/cards/wild.svg';
import drawFour from '../assets/cards/drawFour.svg';
import blue0 from '../assets/cards/blue0.svg';
import blue1 from '../assets/cards/blue1.svg';
import blue2 from '../assets/cards/blue2.svg';
import blue3 from '../assets/cards/blue3.svg';
import blue4 from '../assets/cards/blue4.svg';
import blue5 from '../assets/cards/blue5.svg';
import blue6 from '../assets/cards/blue6.svg';
import blue7 from '../assets/cards/blue7.svg';
import blue8 from '../assets/cards/blue8.svg';
import blue9 from '../assets/cards/blue9.svg';
import blueDrawTwo from '../assets/cards/blueDrawTwo.svg';
import blueRev from '../assets/cards/blueReverse.svg';
import blueSkip from '../assets/cards/blueSkip.svg';
import yellow0 from '../assets/cards/yellow0.svg';
import yellow1 from '../assets/cards/yellow1.svg';
import yellow2 from '../assets/cards/yellow2.svg';
import yellow3 from '../assets/cards/yellow3.svg';
import yellow4 from '../assets/cards/yellow4.svg';
import yellow5 from '../assets/cards/yellow5.svg';
import yellow6 from '../assets/cards/yellow6.svg';
import yellow7 from '../assets/cards/yellow7.svg';
import yellow8 from '../assets/cards/yellow8.svg';
import yellow9 from '../assets/cards/yellow9.svg';
import yellowDrawTwo from '../assets/cards/yellowDrawTwo.svg';
import yellowRev from '../assets/cards/yellowReverse.svg';
import yellowSkip from '../assets/cards/yellowSkip.svg';
import red0 from '../assets/cards/red0.svg';
import red1 from '../assets/cards/red1.svg';
import red2 from '../assets/cards/red2.svg';
import red3 from '../assets/cards/red3.svg';
import red4 from '../assets/cards/red4.svg';
import red5 from '../assets/cards/red5.svg';
import red6 from '../assets/cards/red6.svg';
import red7 from '../assets/cards/red7.svg';
import red8 from '../assets/cards/red8.svg';
import red9 from '../assets/cards/red9.svg';
import redDrawTwo from '../assets/cards/redDrawTwo.svg';
import redRev from '../assets/cards/redReverse.svg';
import redSkip from '../assets/cards/redSkip.svg';
import green0 from '../assets/cards/green0.svg';
import green1 from '../assets/cards/green1.svg';
import green2 from '../assets/cards/green2.svg';
import green3 from '../assets/cards/green3.svg';
import green4 from '../assets/cards/green4.svg';
import green5 from '../assets/cards/green5.svg';
import green6 from '../assets/cards/green6.svg';
import green7 from '../assets/cards/green7.svg';
import green8 from '../assets/cards/green8.svg';
import green9 from '../assets/cards/green9.svg';
import greenDrawTwo from '../assets/cards/greenDrawTwo.svg';
import greenRev from '../assets/cards/greenReverse.svg';
import greenSkip from '../assets/cards/greenSkip.svg';


export default function cardUrl(card: Card): string {
    if (card.value === CardValue.Back) return back;
    switch (card.color) {
        case CardColor.Black:
            switch (card.value) {
                case CardValue.ColorChange:
                    return wild;
                case CardValue.PlusFour:
                    return drawFour;
                default:
                    throw Error('unknown card');
            }
        case CardColor.Red:
            switch (card.value) {
                case CardValue.PlusTwo:
                    return redDrawTwo;
                case CardValue.Reverse:
                    return redRev;
                case CardValue.Skip:
                    return redSkip;
                case CardValue.Zero:
                    return red0;
                case CardValue.One:
                    return red1;
                case CardValue.Two:
                    return red2;
                case CardValue.Three:
                    return red3;
                case CardValue.Four:
                    return red4;
                case CardValue.Five:
                    return red5;
                case CardValue.Six:
                    return red6;
                case CardValue.Seven:
                    return red7;
                case CardValue.Eight:
                    return red8;
                case CardValue.Nine:
                    return red9;
                default:
                    throw Error('unknown card');
            }
        case CardColor.Green:
            switch (card.value) {
                case CardValue.PlusTwo:
                    return greenDrawTwo;
                case CardValue.Reverse:
                    return greenRev;
                case CardValue.Skip:
                    return greenSkip;
                case CardValue.Zero:
                    return green0;
                case CardValue.One:
                    return green1;
                case CardValue.Two:
                    return green2;
                case CardValue.Three:
                    return green3;
                case CardValue.Four:
                    return green4;
                case CardValue.Five:
                    return green5;
                case CardValue.Six:
                    return green6;
                case CardValue.Seven:
                    return green7;
                case CardValue.Eight:
                    return green8;
                case CardValue.Nine:
                    return green9;
                default:
                    throw Error('unknown card');
            }
        case CardColor.Blue:
            switch (card.value) {
                case CardValue.PlusTwo:
                    return blueDrawTwo;
                case CardValue.Reverse:
                    return blueRev;
                case CardValue.Skip:
                    return blueSkip;
                case CardValue.Zero:
                    return blue0;
                case CardValue.One:
                    return blue1;
                case CardValue.Two:
                    return blue2;
                case CardValue.Three:
                    return blue3;
                case CardValue.Four:
                    return blue4;
                case CardValue.Five:
                    return blue5;
                case CardValue.Six:
                    return blue6;
                case CardValue.Seven:
                    return blue7;
                case CardValue.Eight:
                    return blue8;
                case CardValue.Nine:
                    return blue9;
                default:
                    throw Error('unknown card');
            }
        case CardColor.Yellow:
            switch (card.value) {
                case CardValue.PlusTwo:
                    return yellowDrawTwo;
                case CardValue.Reverse:
                    return yellowRev;
                case CardValue.Skip:
                    return yellowSkip;
                case CardValue.Zero:
                    return yellow0;
                case CardValue.One:
                    return yellow1;
                case CardValue.Two:
                    return yellow2;
                case CardValue.Three:
                    return yellow3;
                case CardValue.Four:
                    return yellow4;
                case CardValue.Five:
                    return yellow5;
                case CardValue.Six:
                    return yellow6;
                case CardValue.Seven:
                    return yellow7;
                case CardValue.Eight:
                    return yellow8;
                case CardValue.Nine:
                    return yellow9;
                default:
                    throw Error('unknown card');
            }
        default:
            throw Error('unknown color')
    }
}