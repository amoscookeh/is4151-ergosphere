#!/usr/bin/env python3

"""
TODO: write description
"""

import board
import neopixel
import time

pixels = neopixel.NeoPixel(board.D18, 8)

def wheel(pos):
    # Input a value 0 to 255 to get a color value.
    # The colours are a transition r - g - b - back to r.
    if pos < 0 or pos > 255:
        r = g = b = 0
    elif pos < 85:
        r = int(pos * 3)
        g = int(255 - pos * 3)
        b = 0
    elif pos < 170:
        pos -= 85
        r = int(255 - pos * 3)
        g = 0
        b = int(pos * 3)
    else:
        pos -= 170
        r = 0
        g = int(pos * 3)
        b = int(255 - pos * 3)
    return (r, g, b)


def rainbow_cycle(wait):
    for i in range(255):
        pixel_index = i
        pixels.fill(wheel(pixel_index & 255))
        time.sleep(wait)

def main():
    while True:
        rainbow_cycle(0.05)

if __name__ == '__main__':
    main()
