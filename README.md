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

By defualt, the serve use localhost:5554 address to connect with the emulator. However, it's necesary to set the auth token in order to speak with the adb shell. So, there is a ```config.json``` file to set the that configuration.

```sh
{
	"auth" : "8iBmnkSx1Lt4shhV",
	"port" : 5554,
	"host" : "localhost"
}
```

The emulator auth token can be founded at ```$HOME/.emulator_console_auth_token```

## Mode

 - Simple Mode: Click on map and app push location to emulator.
 - Path Mode: Click several locations on map, then press play and you can see how your location will change following the path create.  
