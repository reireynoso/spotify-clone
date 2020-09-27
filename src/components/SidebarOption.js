import React from 'react';
import './SidebarOption.css';

import {useDataLayerValue} from '../DataLayer';

export default ({title,Icon, playlist}) => {

    const [{}, dispatch] = useDataLayerValue();
    // console.log(playlist)
    const handlePlaylistClick = () => {
        if(playlist){
            dispatch({
                type: "SET_SELECTED_PLAYLIST",
                selectedPlaylist: playlist
            })
        }
    }
    return (
        <div onClick={handlePlaylistClick} className="sidebarOption">
            {Icon && <Icon className="sidebarOption__icon"/>}
            {
                Icon ? <h4>{title}</h4> : <p>{title}</p>
            }
        </div>
    )
}