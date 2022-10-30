import * as React from 'react';
import { TileProps, TileValue } from '../../../shared/types';
import { MIDDLECLICK_EVENT_BUTTON } from '../../../shared/constants';

export default function Tile(props: TileProps) {
    const [middleClickDown, setMiddleClickDown] = React.useState(false);

    function getClassName(): string{
        return props.revealed < -1 ? "game-tile-hidden" : "game-tile-shown";
    }

    function mouseUp(event: React.MouseEvent<HTMLDivElement>) {
        if(event.button !== MIDDLECLICK_EVENT_BUTTON){
            return;
        }
        if(middleClickDown){
            props.tileMiddleClicked(props.x, props.y);
            setMiddleClickDown(false);
        }
    }

    function mouseDown(event: React.MouseEvent<HTMLDivElement>) {
        if(event.button === MIDDLECLICK_EVENT_BUTTON){
            setMiddleClickDown(true);
        }
    }

    function mouseLeft() {
        setMiddleClickDown(false);
    }

    function getValueToDisplay(): string{
        switch(props.revealed){
            case TileValue.QUESTIONMARK: 
                return "?";
            case TileValue.FLAG:
                return "F";
            case TileValue.BLANK:
                return "";
            case TileValue.BOMB: 
                return "B";
            case TileValue.EMPTY:
                return "";
            default:
                return String(props.revealed);
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
