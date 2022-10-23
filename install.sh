#/bin/bash
sudo apt-get update
sudo apt-get install vlc mplayer -y
rm -rf node_modules
npm install
npm install -g pm2
pm2 start player.js
pm2 save
pm2 startup
