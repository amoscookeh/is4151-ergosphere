#!/usr/bin/env python3

"""
Script run forever. This script captures images
for the purpose of model training. Labels is obtained from
Microbit serial
"""

from lib.serial_reader import MicrobitReader
from picamera2 import Picamera2
from datetime import datetime
import cv2
import os
import threading
import sqlite3

period = 2.0
image_folder = "/home/pi/Desktop/Project/images"
db_file = "/home/pi/Desktop/Project/database.db"
picam = Picamera2()
microbit = MicrobitReader()

def capture_image():
	threading.Timer(period, capture_image).start()
	img = picam.capture_array()
	time = datetime.now().isoformat()
	filename = os.path.join(image_folder, f'{time}.png')
	cv2.imwrite(filename, img)
	button, distance = microbit.read_serial()
	print(filename, distance, button)
	conn = sqlite3.connect(db_file)
	conn.execute('''INSERT INTO camera
				       (time, img_file, distance, button) VALUES
				       (?, ?, ?, ?)''',
				       (time, filename, distance, button))
	conn.commit()
	conn.close()
	

def main():
	
	if not os.path.exists(image_folder):
		os.mkdir(image_folder)
	
	picam.configure(picam.create_preview_configuration(main={"format": 'XRGB8888', "size": (640, 480)}))
	picam.start()
	
	conn = sqlite3.connect(db_file)
	conn.execute('''CREATE TABLE IF NOT EXISTS camera (
						time TEXT ,
						img_file TEXT,
						distance REAL,
						button TEXT)''')
	conn.commit()
	conn.close()
	capture_image()

if __name__ == '__main__':
    main()
