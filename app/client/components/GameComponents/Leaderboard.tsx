import * as React from 'react';
import { LeaderboardProps } from '../../../shared/types';

export default function Leaderboard(props: LeaderboardProps) {
    
    function renderLeaderboard() {
        const leaderboardData = props.leaderboardData;
        let jsxLeaderboard = leaderboardData.map((leaderboardEntry, index) => {
            return (
                <div className='leaderboard-entry' key={index}>
                    <div>{`${index+1} ${leaderboardEntry.username}`}</div>
                    <div>{leaderboardEntry.squaresRemaining}</div>
                    <div>{leaderboardEntry.percentage}%</div>
                </div>
            );
        });
        jsxLeaderboard.unshift((
            <div className='leaderboard-header'>
                <div>Username</div>
                <div>Tiles remaining</div>
                <div>% Complete</div>
            </div>
        ));
        return jsxLeaderboard;
    }

    return (
        <div className='leaderboard'>
            {renderLeaderboard()}
        </div>  
    );  
}