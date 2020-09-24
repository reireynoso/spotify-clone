import React, {useEffect, useState} from 'react';
import { getTokenFromUrl } from '../spotify';
import './App.css';

import Login from './Login';
import Player from './Player';

import SpotifyWebApi from 'spotify-web-api-js'
import {useDataLayerValue} from '../DataLayer'

const spotify = new SpotifyWebApi(); //creates instance of spotify allowing us to communicate back and forth

export default () => {

  // const [token, setToken] = useState(null);
  const [{user, token}, dispatch] = useDataLayerValue(); 

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = ""
    const _token = hash.access_token

    if(_token){
      // setToken(_token)
      dispatch({
        type: "SET_TOKEN",
        token: _token
      })

      spotify.setAccessToken(_token)

      //gets user account. returns promise
      spotify.getMe().then(user => {
        
        dispatch({
          type: "SET_USER",
          user
        })
      }) 
    }
  }, [])
  // console.log('TOKEN', token)

  return (
    <div className="app">
      {
        token ? (
          <Player spotify={spotify}/>
        ) :
        (
          <Login/>
        )
      }
    </div>
  );
}
