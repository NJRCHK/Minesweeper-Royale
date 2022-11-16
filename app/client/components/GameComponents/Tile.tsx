import * as React from 'react';
import { TileProps, TileValue } from '../../../shared/types';
import { MIDDLECLICK_EVENT_BUTTON } from '../../../shared/constants';
import TILE1 from '../../../../public/img/1.png';
import TILE2 from '../../../../public/img/2.png';
import TILE3 from '../../../../public/img/3.png';
import TILE4 from '../../../../public/img/4.png';
import TILE5 from '../../../../public/img/5.png';
import TILE6 from '../../../../public/img/6.png';
import TILE7 from '../../../../public/img/7.png';
import TILE8 from '../../../../public/img/8.png';
import FLAG from '../../../../public/img/FLAG.png';
import BOMB from '../../../../public/img/BOMB.png';

const tileArray = [TILE1, TILE2, TILE3, TILE4, TILE5, TILE6, TILE7, TILE8];

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
            case TileValue.FLAG:
                return (<img src={FLAG} className="tile-image"/>);
            case TileValue.BLANK:
                return "";
            case TileValue.BOMB: 
            return (<div className="tile-image-bomb-wrapper"><img src={BOMB} className="tile-image-bomb"/></div>);
            case TileValue.EMPTY:
                return "";
            default:
                return (<img src={tileArray[props.revealed - 1]} className="tile-image"/>);
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
