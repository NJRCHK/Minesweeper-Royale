import * as React from 'react';
import { TileProps, TileValue } from '../../../shared/types';
import { MIDDLECLICK_EVENT_BUTTON } from '../../../shared/constants';

export default function Tile(props: TileProps) {
    const [middleClickDown, setMiddleClickDown] = React.useState(false);

    function getClassName(): string{
        if(props.held){
            return 'game-tile-shown';
        }

        return props.revealed < -1 ? "game-tile-hidden" : "game-tile-shown";
    }

    function mouseUp(event: React.MouseEvent<HTMLDivElement>) {
        if(event.button === MIDDLECLICK_EVENT_BUTTON && middleClickDown){
            props.tileMiddleClicked(props.x, props.y);
            props.middleClickHeld(false, props.x, props.y);
            setMiddleClickDown(false);
        }
        if(props.held && event.button === 0){
            props.leftClickHeld(false, props.x, props.y);
        }
    }

    function mouseDown(event: React.MouseEvent<HTMLDivElement>) {
        if(event.button === MIDDLECLICK_EVENT_BUTTON){
            props.middleClickHeld(true, props.x, props.y);
            setMiddleClickDown(true);
        }
        if(event.button === 0){
            props.leftClickHeld(true, props.x, props.y);
        }
    }

    function mouseLeft() {
        setMiddleClickDown(false);
        if(props.held){
            props.leftClickHeld(false, props.x, props.y);
        }
        props.middleClickHeld(false, props.x, props.y);
    }

    function getValueToDisplay(){
        switch(props.revealed){
            case TileValue.QUESTIONMARK: 
                return "?";
            case TileValue.FLAG:
                return (<img src="http://localhost:3000/img/FLAG.png" className="tile-image"/>);
            case TileValue.BLANK:
                return "";
            case TileValue.BOMB: 
            return (<div className="tile-image-bomb-wrapper"><img src="http://localhost:3000/img/BOMB.png" className="tile-image-bomb"/></div>);
            case TileValue.EMPTY:
                return "";
            default:
                return (<img src={`http://localhost:3000/img/${props.revealed}.png`} className="tile-image"/>);
        }
    }

    return (
        <div className={getClassName()}
            onClick={
                () => {
                    props.tileClicked(props.x, props.y);
                }
            }
            onContextMenu={
                () => {
                    props.tileRightClicked(props.x, props.y);
                }
            }
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onMouseLeave={mouseLeft}
        >
            {getValueToDisplay()}
        </div>
    )
}
