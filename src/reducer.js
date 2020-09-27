export const initialState = {
    user: null,
    token: null,
    // token: process.env.REACT_APP_SPOTIFY_TEMP_ACCESS,
    playlists: [],
    playing: false,
    item: null,
    discoverWeekly: null,
    selectedPlaylist: null
}

const reducer = (state, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            }
        case "SET_TOKEN":
            return {
                ...state,
                token: action.token
            }
        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: action.playlists
            }
        case "SET_ITEM":
            return {
                ...state,
                item: action.item
            }
        case "SET_DISCOVER_WEEKLY": 
            return {
                ...state,
                discoverWeekly: action.discoverWeekly,
                selectedPlaylist: action.discoverWeekly
            }
        case "SET_SELECTED_PLAYLIST":
            return {
                ...state,
                selectedPlaylist: action.selectedPlaylist
            }
        case "SET_PLAYING":
            return {
                ...state,
                playing: action.playing
            }
        default: 
            return state
    }
}

export default reducer