#!/bin/bash

currentDirectory=$(dirname $0)

sudo apt-get install -y git wicd-curses

sudo $currentDirectory/install/wifi-setup-8188eu.sh
sudo depmod -a


cd ~/
wget http://nodejs.org/dist/v0.10.28/node-v0.10.28-linux-arm-pi.tar.gz
tar zxf node-v0.10.28-linux-arm-pi.tar.gz
sudo ln -s /home/pi/node-v0.10.28-linux-arm-pi/bin/npm /usr/bin/npm
sudo ln -s /home/pi/node-v0.10.28-linux-arm-pi/bin/node /usr/bin/node
