# Android Geolocation Simulator
A NodeJS server that push locations to the android emulator.  

## Get started

```sh
npm install
npm start
```

Then, go to your browser and browse to http://localhost:3000
Click on the map, an voila! The android emulator has changed his location.

## Configuration

By defualt, the serve use localhost:5554 address to connect with the emulator. 
However, it's necesary to set the auth token in order to speak with the adb shell. 
Automatically, the server look at ```$HOME/.emulator_console_auth_token```, but you can set some 
command lines argument to configurate the server:

```sh 
	node bin/simulator --host=emulator_host --port=emulator_port --auth=mulator_auth_code 
```

## Mode

 - Simple Mode: Click on map and server push location to emulator.

![Simple Mode](/screenshot/simple_mode.png?raw=true "Simple Mode")

 - Path Mode: Click several locations on map, then press play and you can see how your location will change following the path create.  

![Path Mode](/screenshot/path_mode.png?raw=true "Path Mode")