# Summary

This program is used to stream an Internet radio stream and automatically start playing MP3s from a folder randomly when the Internet connection is lost or the stream is interrupted. The software will automatically return to the Internet stream once the Internet connection becomes available again.

# Installation

## Pre-requisites
`Node.js` and `NPM` should already be installed on the system. Since Node.js relies heavily on `GIT` it is recommended to also install it as a pre-requisite. Since Node.js is cross platform this program should also be cross platform compatible.

Note on ARMv6 processors (such as Raspberry Pi1 and Pi Zero) latest versions of Node.js is not compatible. Last version of node compatible with ARMv6 is node 11.15. When using Raspbian it can be manually downloaded and installed from shell with the following commands:
```
curl -o node-v11.15.0-linux-armv6l.tar.gz https://nodejs.org/dist/v11.15.0/node-v11.15.0-linux-armv6l.tar.gz
```
```
tar -xzf node-v11.15.0-linux-armv6l.tar.gz
```
```
sudo cp -r node-v11.15.0-linux-armv6l/* /usr/local/
```
```
sudo apt-get install git
```


```
1. Run the ./install.sh script to start the install.
```
## MP3 Folder
Place all MP3s that should be played when the main Internet stream fails in the `mp3s` folder.

## Important Notes
 - `pm2` should not be run as root, but as a standard user, i.e. `pm2 startup` command should not be run in root if program needs to startup with boot.
 - On old Raspberry Pi Model B remember to set desired audio output in `sudo raspi-config`.
   If errors occurs with sound driver when using headphone jack it can be fixed by running amixer commands to unmute and/or installing (and forcing) audio      output with Alsa Utils.




# Stream URL

The stream URL can be set in the `settings.json` file.
