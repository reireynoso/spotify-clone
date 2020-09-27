import React from 'react';
import './Footer.css';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline"
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious"
import SkipNextIcon from "@material-ui/icons/SkipNext"
import ShuffleIcon from "@material-ui/icons/Shuffle"
import RepeatIcon from "@material-ui/icons/Repeat"
import VolumeDownIcon from "@material-ui/icons/VolumeDown"
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";

import {Grid, Slider} from "@material-ui/core";

import {useDataLayerValue} from '../DataLayer';

export default ({spotify}) => {

    const [{playing, item}, dispatch] = useDataLayerValue();

    const handlePlayPause = () => {
        if(playing){
            spotify.pause();

            dispatch({
                type: "SET_PLAYING",
                playing: false
            })
        }else{
            spotify.play();
            dispatch({
                type: "SET_PLAYING",
                playing: true
            })
        }
    }

    return (
        <div className="footer">
            <div className="footer__left">
                <img 
                    className="footer__albumLogo" 
                    src="https://i1.wp.com/www.peauxeticexpressions.com/wp-content/uploads/2019/05/Confessions.jpg?fit=500%2C500&ssl=1" 
                    alt=""
                />    
                
                <div className="footer__songInfo">
                    <h4>Yeah!</h4>
                    <p>Usher</p>
                </div>
            </div>
            
            <div className="footer__center">
                <ShuffleIcon className="footer__green"/>
                <SkipPreviousIcon className="footer__icon"/>
                {
                    !playing ? <PlayCircleOutlineIcon 
                        fontSize="large" 
                        className="footer__icon"
                        onClick={handlePlayPause}
                        /> 
                        : 
                        <PauseCircleOutlineIcon 
                        fontSize="large" 
                        className="footer__icon"
                        onClick={handlePlayPause}
                        />
                }
                
                <SkipNextIcon className="footer__icon"/>
                <RepeatIcon className="footer__green"/>
            </div>

            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlayIcon/>
                    </Grid>

                    <Grid item>
                        <VolumeDownIcon/>
                    </Grid>

                    <Grid item xs>
                        <Slider aria-labelledby="continuous-slider"/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}