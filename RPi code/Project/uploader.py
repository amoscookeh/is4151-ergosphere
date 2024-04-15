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

# TODO: Change the base_uri when backend is hosted
base_uri = "http://localhost:3001/"
sensor_uri = base_uri + "api/sensor"
camera_uri = base_uri + "api/camera"
headers = {'Content-Type': 'application/json'}

def read_and_upload_sensor(cursor):
    try:
        cursor.execute('SELECT * FROM sensors')
        rows = cursor.fetchall()
        for idx, row in enumerate(rows):
            # Upload API
            print('Relaying id={}; time = {}, light_level={}, temperature={}, humidity={}, device_id={}'
                .format(idx, row[0], row[1], row[2], row[3], row[4]))
                
            sensor_data = {
                'time':row[0],
                'light_level':row[1],
                'temperature':row[2],
                'humidity':row[3],
                'device_id':row[4]
            }
            req = requests.post(sensor_uri, headers = headers, data = json.dumps(sensor_data))
            print(req.status_code)
            
        # delete after reading
        cursor.execute(f"DELETE FROM sensors")
    except Exception as e:
        print(e)
        
def read_and_upload_camera(cursor):
    try:
        cursor.execute('SELECT * FROM camera')
        rows = cursor.fetchall()
        for row in rows:
            # Upload API
            print('Relaying time={}; img_file = {}, distance={}, button={}, device_id={}'
                .format(row[0], row[1], row[2], row[3], row[4]))
                
            camera_data = {
                'time':row[0],
                'img_file':row[1],
                'distance':row[2],
                'button':row[3],
                'device_id':row[4]
            }
            req = requests.post(camera_uri, headers = headers, data = json.dumps(camera_data))
            print(req.status_code)

        # delete after reading
        cursor.execute(f"DELETE FROM camera")
    except Exception as e:
        print(e)

def read_and_upload():
    threading.Timer(period, read_and_upload).start()
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()
    
    read_and_upload_sensor(cursor)
    # read_and_upload_camera(cursor)
    
    cursor.close()
    conn.commit()
    conn.close()

def main():
    read_and_upload()

if __name__ == '__main__':
    main()
