#!/usr/bin/env python3

"""
Read serial port for microBit labelling
"""

import serial
import serial.tools.list_ports
import time


class MicrobitReader:
    def __init__(self):
        self.request_msg = 'R\n'
        self.ser = self.start_serial()
        
    def start_serial(self):
        ser = None
        ports = serial.tools.list_ports.comports()
        for port, desc, hwid in sorted(ports):
            try:
                ser = serial.Serial(port, 115200, timeout=1.5)
                print(f'Connected to {port}')
            except Exception as e:
                print(e)

        if ser == None:
            print(f'No ports found')
        return ser

    def read_serial(self):
        if self.ser == None:
            return ["", 0]
            
        self.ser.write(self.request_msg.encode())

        line = self.ser.readline().strip().decode("ascii")
        try:
            line = line.split(',')
            if len(line) != 2:
                print(f'Wrong format received {line}')
            else:
                return line[0], float(line[1])
        except Exception as e:
            print(e)


if __name__ == '__main__':
    reader = MicrobitReader()
    while True:
        print(reader.read_serial())
        time.sleep(2)
