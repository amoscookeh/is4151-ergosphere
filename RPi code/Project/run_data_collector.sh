#!/bin/bash         

trap 'kill -TERM $PID1 $PID2' SIGINT

python3 /home/pi/Desktop/Project/I2C-devices-reader.py &
PID1=$!

python3 /home/pi/Desktop/Project/rpi-camera_labelling.py
PID2=$!