#!/usr/bin/env python3

import cv2
import asyncio
import websockets
import numpy as np
import time
from device_id import Device
from picamera2 import Picamera2
import json

d_id = Device.getserial()
uri = "ws://localhost:3001/videofeed?device_id=" + d_id
# uri = "ws://192.168.43.30:3001/videofeed?device_id=" + d_id

async def video_stream():
    async with websockets.connect(uri) as websocket:
        picam = Picamera2()
        picam.configure(picam.create_video_configuration(main={"format": 'XRGB8888', "size": (640, 480)}))
        picam.start()
        while True:
            time.sleep(0.5)
            frame = picam.capture_array()
            _, buffer = cv2.imencode('.jpg', frame)
            await websocket.send(json.dumps({
                "device_id": d_id,
                "frame": buffer.tobytes().hex()
            }))

if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(video_stream())
