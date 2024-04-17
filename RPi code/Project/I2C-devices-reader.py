#!/usr/bin/env python3

"""
Script run forever. This script read I2C devices data
and pushes them into a local sqlite database
"""

import threading
import sqlite3
from lib.grove_light_sensor_v1_2 import GroveLightSensor
from lib.grove_bme280 import BME280
from device_id import Device
from datetime import datetime

period = 2.0
lightSensor_ch = 0 # A2 shield ADC
db_file = "/home/pi/Desktop/Project/database.db"

envSensor = BME280()
lightSensor = GroveLightSensor(lightSensor_ch)

def read_sensors():
	threading.Timer(period, read_sensors).start()
	time = datetime.now().isoformat()
	light_level = lightSensor.light
	env_data = envSensor.getAll()
	humidity, temperature = env_data['H'], env_data['T']
	device_id = Device.getserial()
	print(device_id, time, light_level, temperature, humidity)
	conn = sqlite3.connect(db_file)
	conn.execute('''INSERT INTO sensors
				       (device_id, time, light_level, temperature, humidity) VALUES
				       (?, ?, ?, ?, ?)''',
				       (device_id, time, light_level, temperature, humidity))
	conn.commit()
	conn.close()
	
def main():
	conn = sqlite3.connect(db_file)
	conn.execute('''CREATE TABLE IF NOT EXISTS sensors (
			  			device_id TEXT,
						time TEXT ,
						light_level INTEGER,
						temperature REAL,
						humidity REAL)''')
	conn.commit()
	conn.close()
	read_sensors()

if __name__ == '__main__':
    main()
