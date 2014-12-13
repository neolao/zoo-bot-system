#!/bin/bash

currentDirectory=$(dirname $0)

sudo apt-get install -y git wicd-curses

sudo $currentDirectory/install/wifi-setup-8188eu.sh
sudo depmod -a


