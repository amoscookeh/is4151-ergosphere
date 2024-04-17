# Raspberry Pi
The hardware used is Raspberry Pi 4. The codes are organized into a single folder `Project` which can be put on the rpi desktop. The scripts are hardcoded to use the directory `/home/pi/Desktop/Project` so changing user and directory location would require changing some lines.

## Installation
Start by having the standard OS for RaspberryPi 4. As far as I remember, there is only a few things to be installed.
1. Library to control addressable LEDs
```
$ sudo pip3 install rpi_ws281x adafruit-circuitpython-neopixel
```
2. Library for grove sensors
```
$ git clone https://github.com/Seeed-Studio/grove.py
$ cd grove.py
$ sudo pip3 install .
```
3. sqlitebrowser to view `.db` files conveniently (optional)
```
$ sudo snap install sqlitebrowser
```

## Bash Scripts
There are 2 scripts in the folder, the first is `custom_boot.sh` this is to be setup to run on boot. It's purpose it to switch light to `cyan` once rpi has booted and ready, and turn turn `green` once wifi is connected, specifically `wlan0`. This script has been setup to run following https://raspberrypi-guide.github.io/programming/run-script-on-boot

The second script is `run_data_collector.sh` this script runs 2 Python script at the same time, namely `I2C-devices-reader.py` and `rpi-camera-labelling.py`. These 2 Python scripts will run forever until terminate signal is sent, typically by `ctrl+c`. Command to run in terminal. TRY NOT TO run without terminal by double clicking the file as it will run forever, making it difficult to stop.
```
$ ./home/pi/Desktop/Project/run_data_collector.sh
```

## Data Collecting Scripts
`I2C-devices-reader.py` will read light sensor, and BME280 (temperature and humidity) periodically, and write timestamped data into a sqlite `database.db` file. The light sensor is actually giving analogue signal but since the ADC is an I2C device, the script is named as such. These sensors data are `PUT` into a table named `sensors`

`rpi-camera-labelling.py` will capture an image frame periodically, saving it to `images/` folder and writing the image filepath into the same sqlite `database.db` file, in a table called `camera`. When the receiver MicroBit is connected to RPi, the scripts also send the request message, `"R\n"`, then proceed to process the received button states and distance.

## LED Control Scripts
To change colour and intensity of the sphere, use the following command. `intensity` ranges from `0.0-1.0` with default value of `1.0` if arguement not provided. `colour` keyword `red, orange, yellow, lime, green, turquoise, cyan, blue, violet, magenta, pink, white, black` with `red` being default.
```
$ sudo python3 /home/pi/Desktop/Project/rgb-led_controller.py <colour> <intensity>
```
This script should be called from the script that receive messages from cloud as a device response. 