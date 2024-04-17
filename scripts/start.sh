#!/bin/bash
# Run from root directory

# Install yarn dependencies
yarn install

# Install Python dependencies
pip install -r requirements.txt

# Start Flask server in the background
cd backend/ml
python app.py &

# Start yarn server
cd ../..
yarn start

# Terminate Flask server when script is terminated
trap "kill $(pgrep -f 'python app.py')" EXIT

# Wait for yarn server to finish
wait