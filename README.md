# Summary

This program is used to stream an Internet radio stream and automatically start playing MP3s from a folder randomly when the Internet connection is lost or the stream is interrupted. The software will automatically return to the Internet stream once the Internet connection becomes available again.

# Installation

## Pre-requisites
`Node.js` and `NPM` should already be installed on the system.

```
1. Run the ./install.sh script to start the install.
```
## MP3 Folder
Place all MP3s that should be played when the main Internet stream fails in the `mp3s` folder.

## Important Notes
 - `pm2` should not be run as root, but as a standard user.




# Stream URL

The stream URL can be set in the `settings.json` file.