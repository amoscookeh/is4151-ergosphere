#!/usr/bin/env python3

"""
This script read the local database and uploads it to cloud
"""
import sqlite3
import threading

db_file = "/home/pi/Desktop/Project/database.db"
period = 10

def read_and_upload_sensor(cursor):
    cursor.execute('SELECT * FROM sensors')
    rows = cursor.fetchall()
    for row in rows:
        # Replace print with upload API
        print(row)
    # delete after reading
    cursor.execute(f"DELETE FROM sensors")
        
def read_and_upload_camera(cursor):
    cursor.execute('SELECT * FROM camera')
    rows = cursor.fetchall()
    for row in rows:
        # Replace print with upload API
        print(row)
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
