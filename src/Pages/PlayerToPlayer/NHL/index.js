import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Filter from './components/Filter';
import {
  nhlPlayerRetrieval,
  nhlTeamRetrieval,
  singleTeamRosterRetrieval,
} from '../../../api/nhlApi';
import CompareStats from './components/CompareStats';

import "./style.css"

function NHLPlayerToPlayer() {
  const [currentPlayerOne, setCurrentPlayerOne] = useState('');
  const [currentPlayerTwo, setCurrentPlayerTwo] = useState('');

  const [allPlayers, setAllPlayers] = useState([]);

  const [filteredPlayersOne, setFilteredPlayersOne] = useState([]);
  const [filteredPlayersTwo, setFilteredPlayersTwo] = useState([]);

  const [currentTeamOne, setCurrentTeamOne] = useState('');
  const [currentTeamTwo, setCurrentTeamTwo] = useState('');

  const [teamList, setTeamList] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const setArrays = async () => {
      const allTeams = await nhlTeamRetrieval();
      setTimeout(() => {
        allTeams.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }, 500);
      setTeamList(allTeams);
      const playerList = await nhlPlayerRetrieval();
      setAllPlayers(playerList);
      setFilteredPlayersOne(playerList);
      setFilteredPlayersTwo(playerList);
      setIsLoaded(true);
    };
    setArrays();
  }, []);
    
  if (isLoaded) {
    return (
      <div className="nhl-player-page-container">

        <div className="nhl-players-container">
        {currentPlayerOne.id ? 
        <div style={{backgroundColor:"#00d9ff4d"}} className="nhl-player-stats">
        <CompareStats id={currentPlayerOne.id} />
        <button onClick={() => {setCurrentPlayerOne('')}}>Search</button>
        </div> 
        : 
        <div style={{backgroundColor:"#00d9ff4d"}} className="nhl-player-search">
          <Filter
            allPlayers={allPlayers}
            singleTeamRosterRetrieval={singleTeamRosterRetrieval}
            setPlayers={setFilteredPlayersOne}
            team={currentTeamOne}
            setTeam={setCurrentTeamOne}
            teamList={teamList}
          />
        <Search
          currentTeam={currentTeamOne}
          setCurrentPlayer={setCurrentPlayerOne}
          playerList={filteredPlayersOne}
          teamList={teamList}
          />
          </div>
          }
        {currentPlayerTwo.id ? 
        <div style={{backgroundColor:"#ff00004d"}} className="nhl-player-stats">
        <CompareStats id={currentPlayerTwo.id} /> 
        <button onClick={() => {setCurrentPlayerTwo('')}}>Search</button>
        </div>
        :
        <div style={{backgroundColor:"#ff00004d"}} className="nhl-player-search"> 
          <Filter
            allPlayers={allPlayers}
            singleTeamRosterRetrieval={singleTeamRosterRetrieval}
            setPlayers={setFilteredPlayersTwo}
            team={currentTeamTwo}
            setTeam={setCurrentTeamTwo}
            teamList={teamList}
          />
        <Search
          currentTeam={currentTeamTwo}
          setCurrentPlayer={setCurrentPlayerTwo}
          playerList={filteredPlayersTwo}
          teamList={teamList}
          />
          </div>
          }
        </div>
      </div>
    );
  } else {
    return <div>LOADING BRO</div>;
  }
}

export default NHLPlayerToPlayer;
