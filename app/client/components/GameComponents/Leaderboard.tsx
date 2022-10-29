import * as React from 'react';
import { LeaderboardProps } from '../../../shared/types';

export default function Leaderboard(props: LeaderboardProps) {
    
    function renderLeaderboard() {
        const leaderboardData = props.leaderboardData;
        let jsxLeaderboard = leaderboardData.map((leaderboardEntry, index) => {
            return (
                <tr className='leaderboard-entry' key={index}>
                    <td className='leaderboard-entry-1'>{index+1}</td>
                    <td className='leaderboard-entry-2'>{leaderboardEntry.username}</td>
                    <td className='leaderboard-entry-3'>{leaderboardEntry.squaresRemaining}</td>
                    <td className='leaderboard-entry-4'>{(Math.round(leaderboardEntry.percentage * 100) / 100).toFixed(2)}%</td>
                </tr>
            );
        });
        return jsxLeaderboard;
    }

    return (
        <table className='leaderboard'>
            <thead className='leaderboard-header'>
                <tr className='leaderboard-entry'>
                    <th>Pos</th>
                    <th>Username</th>
                    <th>Tiles remaining</th>
                    <th>% Complete</th>
                </tr>
            </thead>
            <tbody className='leaderboard-entries'>
                {renderLeaderboard()}
            </tbody>
        </table>  
    );  
}
