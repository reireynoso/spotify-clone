import React from 'react';
import './SideBar.css';
import SidebarOption from './SidebarOption';
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

import {useDataLayerValue} from '../DataLayer'

export default () => {
    const [{playlists}, dispatch] = useDataLayerValue();

    return (
        <div className="sidebar">
            <img
                className="sidebar__logo" 
                alt="spotify" 
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"/>
            <SidebarOption Icon={HomeIcon} title="Home"/>
            <SidebarOption Icon={SearchIcon} title="Search"/>
            <SidebarOption Icon={LibraryMusicIcon} title="Your Library"/>
            
            <br/>
            <strong className="sidebar__title">PLAYLISTS</strong>
            <hr/>

            {
                playlists?.items?.map(playlist => (
                    <SidebarOption title={playlist.name}/>
                ))
            }
        </div>
    )
}