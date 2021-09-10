import React, { useState, useEffect } from 'react';
import { singlePlayerStatRetrieval } from '../../../../api/nhlApi';

export default function PositionPlayers({ id }) {
  const [stats, setStats] = useState({});
  const [playerInfo, setPlayerInfo] = useState({});
  const [playerStats, setPlayerStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setArrays = async () => {
      const playerStats = await singlePlayerStatRetrieval(id);
      setStats(playerStats);
      const playerStatsHelper =
        playerStats.playerStats.data.stats[0].splits[0].stat;
      const playerInfoHelper = playerStats.playerInfo.data.people[0];
      setPlayerInfo(playerInfoHelper);
      setPlayerStats(playerStatsHelper);
      setLoading(true);
    };
    setArrays();
  }, []);

  if (loading) {
    return (
      <div>
        <div>
          <h2>
            {stats.playerStats.data.stats[0].splits[0].season} Regular Season
            (will have option to change season)
          </h2>
          <img
            src={`http://nhl.bamcontent.com/images/headshots/current/168x168/${id}.jpg`}
            alt={`Human`}
          />
          <h3>Name: {playerInfo.fullName}</h3>
          <h3>Height: {playerInfo.height}</h3>
          <h3>Weight: {playerInfo.weight}lbs</h3>
          <h3>Position: {playerInfo.primaryPosition.name}</h3>
          <h3>Team: {playerInfo.currentTeam.name}</h3>
          <h3>
            DOB: {playerInfo.birthDate} ({playerInfo.currentAge} years old)
          </h3>
          <h3>
            Birthplace: {playerInfo.birthCity}, {playerInfo.birthStateProvince}
          </h3>
          <h3>Hand: {playerInfo.shootsCatches}</h3>
        </div>
        <div>
          <h3>Games Played: {playerStats.games}</h3>
          <h3>Points: {playerStats.points}</h3>
          <h3>Goals: {playerStats.goals}</h3>
          <h3>Assists: {playerStats.assists}</h3>
          <h3>Shots: {playerStats.shots}</h3>
          <h3>Hits: {playerStats.hits}</h3>
          <h3>Blocked Shots: {playerStats.blocked}</h3>
          <h3>Penalty Minutes: {playerStats.assists}</h3>
          <h3>PowerPlay Goals: {playerStats.powerPlayGoals}</h3>
          <h3>PowerPlay Points: {playerStats.powerPlayPoints}</h3>
          <h3>Plus/Minus (+/-): {playerStats.plusMinus}</h3>
          <h3>TOI Per Game: {playerStats.timeOnIcePerGame}</h3>
        </div>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
