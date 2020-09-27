import React, {useState,useEffect} from 'react';
import './Body.css';
import Header from './Header';
import {useDataLayerValue} from '../DataLayer';
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SongRow from './SongRow';


export default ({spotify}) => {
    const [{selectedPlaylist}, dispatch] = useDataLayerValue();
    const [tracks, setTracks] = useState([])
    
    useEffect(() => {   
        const token = JSON.parse(localStorage.getItem("spotify")).token
        if(selectedPlaylist && !selectedPlaylist.tracks.items){
            console.log(selectedPlaylist)
            fetch(`https://api.spotify.com/v1/playlists/${selectedPlaylist.id}/tracks`, {
                headers: {
                    'Authorization': `Bearer ` + token
                }
            })
            .then(res => res.json())
            .then(data => setTracks(data.items))
        }
    }, [selectedPlaylist])

    const determineWhichData = () => {
        if(selectedPlaylist){
            return selectedPlaylist.tracks.items ? selectedPlaylist.tracks.items : tracks
        }

        return tracks
    }

    return (
        <div className="body">
            <Header spotify={spotify}/>

            <div className="body__info">
                <img src={selectedPlaylist?.images[0].url} alt=""/>
                <div className="body__infoText">
                     <strong>PLAYLIST</strong>
                     <h2>Discover Weekly</h2>
                     <p>{selectedPlaylist?.description}</p>
                </div>
            </div>

            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilledIcon className="body__shuffle"/>
                    <FavoriteIcon fontSize="large"/>
                    <MoreHorizIcon/>
                </div>

                {
                    determineWhichData().map(item => (
                        <SongRow key={item.track.id} track={item.track} />
                    )) 
                }
            </div>
        </div>
    )
}