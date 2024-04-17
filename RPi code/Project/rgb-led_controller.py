#!/usr/bin/env python3

"""
This script changed the colour of led according to passed args
default colour is white, default brightness is 1.0
"""

import board
import neopixel
import sys



def colour_decoder(colour):
    if colour == 'red':
        return (255, 0 ,0)
    if colour == 'orange':
        return (255, 55 ,0)
    if colour == 'yellow':
        return (255, 175 ,0)
    if colour == 'lime':
        return (175, 255 ,0)
    if colour == 'green':
        return (0, 255 ,0)
    if colour == 'turquoise':
        return (0, 255, 128)
    if colour == 'cyan':
        return (0, 128 ,255)
    if colour == 'blue':
        return (0, 0, 255)
    if colour == 'violet':
        return (128, 0, 255)    
    if colour == 'magenta':
        return (200, 0, 255)
    if colour == 'pink':
        return (255, 0, 175)
    if colour == 'white':
        return (255, 255 ,255)
    if colour == 'black':
        return (0, 0 ,0)
    

def update_colour(colour, brightness):
    rgb = colour_decoder(colour)
    pixels = neopixel.NeoPixel(board.D18, 8, brightness=brightness)
    pixels.fill(rgb)

def main():
    arg1 = sys.argv[1] if len(sys.argv) > 1 else 'red'
    arg2 = sys.argv[2] if len(sys.argv) > 2 else 1
    update_colour(arg1, float(arg2))

if __name__ == '__main__':
    main()
