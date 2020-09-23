import React, {useEffect, useState} from 'react';
import { getTokenFromUrl } from '../spotify';
import './App.css';
import Login from './Login'

import SpotifyWebApi from 'spotify-web-api-js'

const spotify = new SpotifyWebApi(); //creates instance of spotify allowing us to communicate back and forth

export default () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = ""
    const _token = hash.access_token

    if(_token){
      setToken(_token)

      spotify.setAccessToken(_token)

      //gets user account. returns promise
      spotify.getMe().then(user => {
        console.log('user', user)
      }) 
    }



    // console.log('TOKEN', token)
  }, [])

  return (
    <div className="app">
      {
        token ? (
          <h1>Logged IN</h1>
        ) :
        (
          <Login/>
        )
      }
    </div>
  );
}
