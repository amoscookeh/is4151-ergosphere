#!/usr/bin/env python3

"""
This script adjusts the light intensity of an LED according to the provided arguments.
The default color is white, and the default brightness is 1.0 (full brightness).
"""

import board
import neopixel
import sys

def colour_decoder(colour):
    """ Returns the RGB tuple for a given colour name. """
    colors = {
        'red': (255, 0, 0),
        'orange': (255, 55, 0),
        'yellow': (255, 175, 0),
        'lime': (175, 255, 0),
        'green': (0, 255, 0),
        'turquoise': (0, 255, 128),
        'cyan': (0, 128, 255),
        'blue': (0, 0, 255),
        'violet': (128, 0, 255),
        'magenta': (200, 0, 255),
        'pink': (255, 0, 175),
        'white': (255, 255, 255),
        'black': (0, 0, 0)
    }
    return colors.get(colour, (255, 255, 255))  # Default to white if colour not found

def update_light_intensity(colour, brightness):
    """ Updates the color and brightness of the LED strip. """
    pixels = neopixel.NeoPixel(board.D18, 8, brightness=brightness)
    rgb = colour_decoder(colour)
    pixels.fill(rgb)


def main():
    """ Main function to handle command line arguments for color and brightness. """
    colour = sys.argv[1] if len(sys.argv) > 1 else 'white'  # Default color is white
    brightness = float(sys.argv[2]) if len(sys.argv) > 2 else 1.0  # Default brightness is 1.0 (full brightness)
    update_light_intensity(colour, brightness)

if __name__ == '__main__':
    main()
