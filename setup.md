# Spotify setup
- Refer to documenttion: https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
- Spotify will take care of the authentication. Redirect users to their end point
- authEndpoint = "https://accounts.spotify.com/authorize"
- redirect back once authorized
- locally => "http://localhost:3000/"
- Include the client ID you're provided
- Provide scopes of what we're able to do in the app
- provide uri to spotify
- once authorized,token is granted and we need to pull from the url using `window.location.hash`
