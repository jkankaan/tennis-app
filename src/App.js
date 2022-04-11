// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Form from './components/Form.js';
import picture from './pictures/tennis_racket_and_ball.jpg';

/*const axios = require('axios');*/

function App() {

  console.log('4');
  const [player, setPlayer] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [matches, setMatches] = useState('');
  console.log('1');
  console.log({matches});

  function addPlayer(name) {
    const player = {name};
    console.log(player);
    setPlayer(name);
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
      return obj;
    } else {
      for (var i = 0, len = Object.keys(obj).length; i < len; i++) {
        if (typeof obj[i] == 'object') {
          var found = this.findNested(obj[i], key, value);
          if (found) {
            // If the object was found in the recursive call, bubble it up.
            return found;
          }
        }
      }
    }
  }

  useEffect(() => {
    function fetchData() {
      axios({
        url: 'http://localhost:3000/profile',
        params: { answer: 42 },
        method: 'get',
        timeout: 8000,
      })
        .then(res => {
          res.data;
          console.log(res.data);
          setMatches(res.data);
          console.log('3');
          console.log({matches});
        })
        .catch(err => console.error(err));
    }
    fetchData();
    console.log('2');
    console.log({matches});
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

  //const match = findNested(matches, 'lastname', 'Ruusuvuori');
  //console.log({match});
  //console.log('2');

  /* findMatch();*/

  return (
    <div className="App">
      <header className="App-header">
        <img src={picture} className="App-logo" alt="logo" />
        
        <Form addPlayer={addPlayer}/>

        {/*{findNested(matches, 'lastname', 'Ruusuvuori' )}*/}
        
        <a
          className="App-link"
          href="./pictures/tennis_racket_and_ball.jpg"
          target="_blank"
          rel="noopener noreferrer"
        >
          {player}
        </a>
      </header>
    </div>
  );
}

export default App;
