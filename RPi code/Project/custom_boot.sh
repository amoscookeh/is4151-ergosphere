#!/bin/bash         

<<<<<<< HEAD
sudo python3 /home/pi/Desktop/Project/rgb_led_controller.py cyan
=======
sudo python3 /home/pi/Desktop/Project/rgb-led_controller.py cyan
>>>>>>> master

check_wifi_connection() {
    if [[ "$(nmcli -t -f DEVICE,STATE dev)" =~ "wlan0:connected" ]]; then
        return 0
    else
        return 1
    fi
}

while ! check_wifi_connection; do
    sleep 1
done

sudo python3 /home/pi/Desktop/Project/rgb-led_controller.py green