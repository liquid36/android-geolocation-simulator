# android-geolocation-simulator
An nodeJS server to push Locations to an android emulator.  

## How to use

```sh
npm install
npm start
```

Then, go to your browser and surf to localhost:3000
Click on the map, an voula! The android emulator has changed his location.

## Configuration

By defualt, the serve use localhost:5554 address to connect with the emulator. Hoever, it's necesary the auth token in order to speak with the adb shell. So, there is a config.json file to set the configuration.

```sh
{
	"auth" : "8iBmnkSx1Lt4shhV",
	"port" : 5554,
	"host" : "localhost"
}
```

## Mode

 - Simple Mode: Click on map and app push location to emulator.
 - Path Mode: Click several locations on map, then press play and you can see how your location will change following the path create.  
