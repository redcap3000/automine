# automine
A simple script launcher that determines the least difficult coin to mine from a list of selected coins.



## Why

Because parsing json in curl/bash scripts is not fun;
I wanted a better way to launch and modify mining scripts without having to modify javascript all the while wanting to automate
selected coins and change them based on graphics cards installed.

## Basic instructions

This node script uses whattomine.com to determine what to mine based on difficulty every two min. For its full intended use
one must create bash scripts that start and stop miners per each currency 'watched'


This method is ideal if you are tinkering with your mining settings and don't want
to restart the automine process.


### Preinstallation
1 -- create mining script in repository folder
2 -- run chmod 755

## Example bash script (alias style)
```
# Change directory to where mining scripts are executed, using direct path
cd /home/redcap3000/mineAlias
# launching a script that kills all the miners
./killMiners.sh
# launching another script 
./btg.sh
```
It is created like this since there are many options for miners with vastly different syntax,
so you can handle that rather than support 6 different zcash miners. And often you may need to swap out one miner
for another based on pool.

### Quickstart
npm install
nodejs index.js
