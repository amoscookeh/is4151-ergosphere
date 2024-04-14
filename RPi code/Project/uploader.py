#!/usr/bin/env python3

"""
This script read the local database and uploads it to cloud
"""
import sqlite3
import threading
import requests
import json

db_file = "/home/pi/Desktop/Project/database.db"
period = 10

base_uri = "http://localhost:3001/"
sensor_uri = base_uri + "api/sensor"
camera_uri = base_uri + "api/camera"
headers = {'Content-Type': 'application/json'}

def read_and_upload_sensor(cursor):
    cursor.execute('SELECT * FROM sensors')
    rows = cursor.fetchall()
    for row in rows:
        # Upload API
        print('Relaying id={}; device_id = {}, time={}, light_level={}, temperature={}, humidity={}'
              .format(row[0], row[1], row[2], row[3], row[4], row[5]))
            
        sensor_data = {
            'device_id':row[1],
            'time':row[2],
            'light_level':row[3],
            'temperature':row[4],
            'humidity':row[5]
        }
        req = requests.post(sensor_uri, headers = headers, data = json.dumps(sensor_data))
        print(req.status_code)
        
    # delete after reading
    cursor.execute(f"DELETE FROM sensors")
        
def read_and_upload_camera(cursor):
    cursor.execute('SELECT * FROM camera')
    rows = cursor.fetchall()
    for row in rows:
        # Upload API
        print('Relaying id={}; device_id = {}, time={}, img_file={}, distance={}, button={}'
              .format(row[0], row[1], row[2], row[3], row[4], row[5]))
            
        camera_data = {
            'device_id':row[1],
            'time':row[2],
            'img_file':row[3],
            'distance':row[4],
            'button':row[5]
        }
        req = requests.post(camera_uri, headers = headers, data = json.dumps(camera_data))
        print(req.status_code)

    # delete after reading
    cursor.execute(f"DELETE FROM camera")

def read_and_upload():
    threading.Timer(period, read_and_upload).start()
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    
    read_and_upload_sensor(cursor)
    read_and_upload_camera(cursor)
    
    cursor.close()
    conn.commit()
    conn.close()

def main():
    read_and_upload()

if __name__ == '__main__':
    main()
