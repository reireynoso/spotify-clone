import React, {useEffect} from 'react';
import { getTokenFromUrl } from '../spotify';
import './App.css';

import Login from './Login';
import Player from './Player';

import SpotifyWebApi from 'spotify-web-api-js'
import {useDataLayerValue} from '../DataLayer'

const spotify = new SpotifyWebApi(); //creates instance of spotify allowing us to communicate back and forth

export default () => {

  const [{user, token}, dispatch] = useDataLayerValue(); 

  useEffect(() => {
    let _token;
    // gets the access token from spotify in localstorage
    const localStorageToken = localStorage.getItem("spotify")
    if(localStorageToken){
      // parse the localStorage object and pulls out the token
      _token = JSON.parse(localStorageToken).token
    }else{
      // if no access token in localStorage, redirect to Spotify and gain one
      const hash = getTokenFromUrl();
      window.location.hash = ""
      _token = hash.access_token
    }

    if(_token){
      const spotifyToken = {
        token: _token
      }
      localStorage.setItem("spotify", JSON.stringify(spotifyToken))
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
      
      // gets use playlist
      spotify.getUserPlaylists().then((playlists) => {
        // console.log(playlists)
        dispatch({
          type: "SET_PLAYLISTS",
          playlists
        })
      })

      spotify.getPlaylist("37i9dQZEVXcO8XvfMXItW9").then(res => {
        // console.log(res)
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discoverWeekly: res
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
