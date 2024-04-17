import json
import random

import paho.mqtt.client as mqtt

from rgb_led_controller import update_light_intensity

curr_color = "white"
curr_brightness = 1

def on_connect(client, userdata, flags, rc):
	if rc == 0:
		print("Connected to MQTT Broker!")
	else:
		print('Failed to connect, return code {:d}'.format(rc))

def on_message(client, userdata, msg):
	global curr_color
	global curr_brightness

	if msg.topic == "/ergoSphere":
		decoded_msg = json.loads(msg.payload.decode())
		try:
			command = decoded_msg["command"]
			if command == "intensity":
				intensity = float(decoded_msg["intensity"])
				update_light_intensity(curr_color, intensity)
			elif command == "colour":
				color = decoded_msg["colour"]
				curr_color = color
				update_light_intensity(color, curr_brightness)
			else:
				print('Invalid command: {}'.format(command))
		except Exception as e:
			print(e)

	print('Received {} from {} topic'.format(msg.payload.decode(), msg.topic))

def run():
	try:
		broker = 'broker.emqx.io'
		port = 1883
		topic = "/ergoSphere"
		client_id = f'python-mqtt-{random.randint(0, 10000)}'
		username = 'emqx'
		password = 'public'

		print('client_id={}'.format(client_id))

		# Set Connecting Client ID
		client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION1, client_id)
		client.username_pw_set(username, password)
		client.on_connect = on_connect
		client.connect(broker, port)
		
		client.subscribe(topic)
		client.on_message = on_message

		client.loop_forever()				

	except KeyboardInterrupt:
			print('Program terminated!')



if __name__ == '__main__':
	run()