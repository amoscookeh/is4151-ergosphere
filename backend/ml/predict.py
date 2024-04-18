from joblib import load
from flask import request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import numpy as np
import os



def cluster(light):
    
    try:
        
        # predict new temperature and humidity observation
        kmeans = load('lightcluster.joblib')
        
        # temperature, humidity
        newX = [[light]]
        result = kmeans.predict(newX)
        
        print('Cluster Light: light={}; cluster={}'.format(light, result[0]))

        return str(result[0])
        
    except Exception as error:

        print('Error: {}'.format(error.args[0]))

        return 'Unknown'
    
def hydrationTime(hour, day_of_week, temperature, humidity):

    try:
        # Load data from CSV file
        file_path = os.getcwd() + '/data/temp_humidity.csv'
        df = pd.read_csv(file_path, parse_dates=['timestamp', 'last_drank'])

        # Calculate the time in hours until the next hydration
        df['time_until_next_hydration'] = (df['timestamp'] - df['last_drank']).dt.total_seconds() / 3600

        # Feature Engineering
        df['hour'] = df['timestamp'].dt.hour
        df['day_of_week'] = df['timestamp'].dt.dayofweek

        # Prepare features and target
        X = df[['hour', 'day_of_week', 'temperature', 'humidity']]
        y = df['time_until_next_hydration']

        # Split data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        print(X_train)
        # Create and train the model
        model = LinearRegression()
        model.fit(X_train, y_train)

        y_pred = model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)
        rmse = np.sqrt(mse)

        print("Root Mean Squared Error:", rmse)
        # Create DataFrame from the received data
        input_data = pd.DataFrame({
            'hour': [hour],
            'day_of_week': [day_of_week],
            'temperature': [temperature],
            'humidity': [humidity]
        })

        # Predict using the model
        prediction = model.predict(input_data)
        predicted_time = prediction[0]

        # Return the prediction
        return str(predicted_time)
    
    except Exception as error:

        print(error)

        return 'Unknown'
