#!/usr/bin/env python3

"""
This script captures the serial number of the RPi device used to send data to cloud
"""

class Device:
    def getserial():
        # Extract serial from cpuinfo file
        try:
            f = open('/proc/cpuinfo','r')
            for line in f:
                if line[0:6]=='Serial':
                    cpuserial = line[10:26]
                f.close()
            return cpuserial
        except:
            raise Exception("Error reading CPU serial")  