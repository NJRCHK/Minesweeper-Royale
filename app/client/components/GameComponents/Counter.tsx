import * as React from 'react';
import { CounterProps } from '../../../shared/types';

export default function Counter(props: CounterProps) {

    function displayCounter() {
        const counterString = "000" + String(props.mines);
        if(props.mines > 999){
            return (
                <div className='timer-flex-wrapper'>
                    <img src={`http://localhost:3000/img/TIMER9.png`}/>
                    <img src={`http://localhost:3000/img/TIMER9.png`}/>
                    <img src={`http://localhost:3000/img/TIMER9.png`}/>
                </div>
            )
        }
        else if (props.mines < 0){
            return (
                <div className='timer-flex-wrapper'>
                    <img src={`http://localhost:3000/img/TIMER0.png`}/>
                    <img src={`http://localhost:3000/img/TIMER0.png`}/>
                    <img src={`http://localhost:3000/img/TIMER0.png`}/>
                </div>
            )
        }
        return (
            <div className='timer-flex-wrapper'>
                <img src={`http://localhost:3000/img/TIMER${counterString[counterString.length - 1]}.png`}/>
                <img src={`http://localhost:3000/img/TIMER${counterString[counterString.length - 2]}.png`}/>
                <img src={`http://localhost:3000/img/TIMER${counterString[counterString.length - 3]}.png`}/>
            </div>
        )
    }

    return (
        <div className="game-bar-item">{displayCounter()}</div>    
    )
}
