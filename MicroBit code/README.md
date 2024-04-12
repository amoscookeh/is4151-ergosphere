# Microbit
## Purpose
A pair of microbits are used in this project as a remote labeller. These are to be used only while gathering data and completely removed when product is done and operational.

## Receiver
The receiver functions as a relay between RPi and remote labeller. It communicates with the RPi via serial, and to remote labeller via radio. It passes `"R\n"` message from serial to `"request"` message through radio, and passed a string-value message as a single string `"<button-state>,<distance>"`

## Remote
The remote collects 2 type of data. The first is connected ultrasonic sensor for distance measuring. And the second is Button A and Button B states. The LED matrix light up to indicate the button states. The measurement is done when remote receive a `"request"` message through radio. And it sends  a string-value message in the form of `"<button-states>":<distance>`
