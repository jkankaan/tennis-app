/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Form from './components/Form.js';
import picture from './pictures/tennis_racket_and_ball.jpg';

/*const axios = require('axios');*/

function App() {

  const [player, setPlayer] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [matches, setMatches] = useState('');
  const [rankings, setRankings] = useState('');
  const [ranking, setRanking] = useState('');

  function addPlayer(name) {
    const player = {name};
    console.log(player);
    setPlayer(name);
    var rank = rankings.filter((playerIndex) => playerIndex.PARTICIPANT_NAME === name);
    console.log(rank);
    console.log(rank[0].RANK);
    setRanking(rank[0].RANK);
    console.log('RANKING', ranking);
  }
    

  const today = new Intl.DateTimeFormat('fr-CA', {year: 'numeric',
    month: '2-digit', day: '2-digit'}).format(Date.now());

  // eslint-disable-next-line no-unused-vars
  const options = {
    method: 'GET',
    url: 'https://tennis-live-data.p.rapidapi.com/matches-by-date/' + today,
    headers: {
      'X-RapidAPI-Host': 'tennis-live-data.p.rapidapi.com',
      'X-RapidAPI-Key': 'a7689aa85bmsh3c9e073ec9511aep1b03b9jsnf18f2bfa47d0'
    }
  };

  // eslint-disable-next-line no-unused-vars
  function findNested(obj, key, value) {
    // Base case
    if (obj[key] === value) {
      console.log('_1_');
      return obj;
    } else {
      console.log('_2_');
      var keys = Object.keys(obj);
      for (var i = 0, len = keys.length; i < len; i++) {
        var k = keys[i];
        console.log(obj[i]);
        console.log({len});
        console.log('_3_');
        if (obj[k] && typeof obj[k] == 'object') {
          console.log('_4_');
          console.log('k:', k);
          var found = findNested(obj[k], key, value);
          if (found) {
            // If the object was found in the recursive call, bubble it up.
            return found;/* */
          }
        }
      }
    }
  }

  function listRankings(props) {
    const rankings = props;
    const topTen = rankings.slice(0,10);
    console.log('ranking',{rankings});
    if (topTen.length > 0) {
      var playerList = topTen.map((playerIndex) => 
        <li key={playerIndex.RANK}>
          {playerIndex.PARTICIPANT_NAME} </li>
      );
      return (
        <ol> {playerList}  </ol>
      );
    }
  }

  useEffect(() => {
    function fetchData() {
      axios({
        url: 'http://localhost:3000/matches',
        method: 'get',
        timeout: 8000,
      })
        .then(res => {
          res.data;
          setMatches(res.data);
        })
        .catch(err => console.error(err));
    }
    fetchData();
    function fetchRanking() {
      const options = {
        method: 'GET',
        url: 'https://flashscore.p.rapidapi.com/v1/rankings/data',
        params: {locale: 'fi_FI', ranking_id: 'dSJr14Y8'},
        headers: {
          'X-RapidAPI-Host': 'flashscore.p.rapidapi.com',
          'X-RapidAPI-Key': 'a7689aa85bmsh3c9e073ec9511aep1b03b9jsnf18f2bfa47d0'
        }
      };
      axios(options)
        .then(res => {
          res.data.DATA;
          setRankings(res.data.DATA);
        })
        .catch(err => console.error(err));
    }
    fetchRanking();
  },[]);

  
    
  /*function findMatch() {
    const tournaments = matches.results;
    console.log({tournaments});
    // eslint-disable-next-line no-unused-vars
    const isPlayer = (element) => {
      element.tournament.name === 'Rolex Monte-Carlo Masters';
      console.log(element.tournament.name);
    };
    // eslint-disable-next-line no-unused-vars
    // const games = tournaments.map((tournament, i) => tournament.matches);
    // eslint-disable-next-line no-unused-vars
    tournaments.findIndex((isPlayer, index) =>  {console.log('löytyi');});
  } */
  console.log(typeof(matches));
  const osuma = findNested(matches, 'name', 'Ruusuvuori');
  console.log({matches});
  console.log({osuma});
  const obj = Object.values(matches);
  console.log(Object.values(matches));
  console.log(obj[1]);
  var keysbyindex = Object.keys(matches);
  console.log({keysbyindex});
  for (var i=0; i<keysbyindex.length; i++)
    alert(matches[keysbyindex[i]]);
  console.log({rankings});
  

  /* findMatch();*/

  return (
    <div className="App">
      <header className="App-header">
        <img src={picture} className="App-logo" alt="logo" />
        
        <Form addPlayer={addPlayer}/>

        {/*findNested(matches, 'lastname', 'Ruusuvuori' )*/}
        
        <a
          className="App-link"
          href="./pictures/tennis_racket_and_ball.jpg"
          target="_blank"
          rel="noopener noreferrer"
        >
          {ranking} {player}
        </a>
        <a>
          {listRankings(rankings)}
        </a>
      </header>
    </div>
  );
}

export default App;
