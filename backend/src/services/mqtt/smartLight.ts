import { publishMqttMessage } from "./mqttClient";

const base_uri = 'http://127.0.0.1:5000/';
const lightcluster_uri = base_uri + 'api/predict-light';

export function optimiseLight(lightLevel: number) {
    fetch(`${lightcluster_uri}?light=${lightLevel}`)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(cluster_label => {
        cluster_label = cluster_label.replace(/"/g, '').trim();
        console.log('Cluster Label: ' + cluster_label);

        let smartlight = 'off';
        if (cluster_label === '1') {
            smartlight = 'high';
        }
        if (cluster_label === '2') {
            smartlight = 'low';
        }

        console.log('Smartlight command: ' + smartlight);

        publishMqttMessage(smartlight);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}