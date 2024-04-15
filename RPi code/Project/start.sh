#!/bin/bash

# Run this from Desktop directory of the project
# Check if the time interval is provided as a command line argument
if [ $# -eq 0 ]; then
    interval=5
else
    interval=$1
fi

# Start the data collector script in the background
./Project/run_data_collector.sh &

# Run the uploader script periodically
while true; do
    python3 ./Project/uploader.py
    sleep $interval
done