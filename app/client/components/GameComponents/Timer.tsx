import * as React from 'react';
import { TimerProps } from '../../../shared/types';



export default function Timer(props: TimerProps) {

    function getTimeToDisplay() {
        const stringTime = "0" + "0" + String(props.time);
        if (props.time > 999) {
            return (
                <div className='timer-flex-wrapper'>
                    <img src={`http://localhost:3000/img/TIMER9.png`}/>
                    <img src={`http://localhost:3000/img/TIMER9.png`}/>
                    <img src={`http://localhost:3000/img/TIMER9.png`}/>
                </div>
            )
        }
        return (
            <div className='timer-flex-wrapper'>
                    <img src={`http://localhost:3000/img/TIMER${stringTime[stringTime.length - 1]}.png`}/> 
                    <img src={`http://localhost:3000/img/TIMER${stringTime[stringTime.length - 2]}.png`}/> 
                    <img src={`http://localhost:3000/img/TIMER${stringTime[stringTime.length - 3]}.png`}/>  
            </div>
        )
    }

    return (
        <div className="game-bar-item">{getTimeToDisplay()}</div>
    )
}
