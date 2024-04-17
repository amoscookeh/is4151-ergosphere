#!/bin/bash

# Function to handle SIGINT signal
terminate_scripts() {
    echo "Terminating data collector and child scripts..."
    kill -TERM $DEVICE_READER_PID
    kill -TERM $RPI_CAMERA_STREAM_PID
    kill -TERM $RPI_MQTT_SUBSCRIBER_PID
    echo "Exiting main script..."
    exit 0
}

# Set up trap for SIGINT
trap 'terminate_scripts' SIGINT

# Check if the time interval is provided as a command line argument
if [ $# -eq 0 ]; then
    interval=5
else
    interval=$1
fi

# Run data collection processes
python3 ./Project/I2C-devices-reader.py &
DEVICE_READER_PID=$!
python3 ./Project/rpi-camera-stream.py &
RPI_CAMERA_STREAM_PID=$!

# Run MQTT script in the background
sudo python3 ./Project/mqtt_subscriber.py &
RPI_MQTT_SUBSCRIBER_PID=$!

# Run the uploader script periodically
while true; do
    python3 ./Project/uploader.py
    sleep $interval
done
