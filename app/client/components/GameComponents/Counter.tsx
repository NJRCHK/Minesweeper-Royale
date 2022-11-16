import * as React from 'react';
import { CounterProps } from '../../../shared/types';
import TIMER0 from '../../../../public/img/TIMER0.png';
import TIMER1 from '../../../../public/img/TIMER1.png';
import TIMER2 from '../../../../public/img/TIMER2.png';
import TIMER3 from '../../../../public/img/TIMER3.png';
import TIMER4 from '../../../../public/img/TIMER4.png';
import TIMER5 from '../../../../public/img/TIMER5.png';
import TIMER6 from '../../../../public/img/TIMER6.png';
import TIMER7 from '../../../../public/img/TIMER7.png';
import TIMER8 from '../../../../public/img/TIMER8.png';
import TIMER9 from '../../../../public/img/TIMER9.png';

const TIMERIMAGES = [TIMER0, TIMER1, TIMER2, TIMER3, TIMER4, TIMER5, TIMER6, TIMER7, TIMER8, TIMER9];

export default function Counter(props: CounterProps) {

    function displayCounter() {
        const counterString = "000" + String(props.mines);
        if(props.mines > 999){
            return (
                <div className='timer-flex-wrapper'>
                    <img src={TIMER9}/>
                    <img src={TIMER9}/>
                    <img src={TIMER9}/>
                </div>
            )
        }
        else if (props.mines < 0){
            return (
                <div className='timer-flex-wrapper'>
                    <img src={TIMER0}/>
                    <img src={TIMER0}/>
                    <img src={TIMER0}/>
                </div>
            )
        }
        return (
            <div className='timer-flex-wrapper'>
                <img src={TIMERIMAGES[counterString[counterString.length - 1]]}/>
                <img src={TIMERIMAGES[counterString[counterString.length - 2]]}/>
                <img src={TIMERIMAGES[counterString[counterString.length - 3]]}/>
            </div>
        )
    }

    return (
        <div className="game-bar-item">{displayCounter()}</div>    
    )
}
