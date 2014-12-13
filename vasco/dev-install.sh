#!/bin/bash

# Go to the home
cd ~/

# Install packages
sudo apt-get install -y git zsh unzip ctags vim tmux gcc

# Install ZSH
wget http://doc.neolao.com/zsh.zip
unzip zsh.zip
rm zsh.zip
chsh -s /usr/bin/zsh

# Install VIM
wget http://doc.neolao.com/vim.zip
unzip vim.zip
rm vim.zip

# Install TMUX
wget http://doc.neolao.com/.tmux.conf

# Install WiringPi
git clone git://git.drogon.net/wiringPi
cd wiringPi
./build


