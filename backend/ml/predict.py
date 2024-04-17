from joblib import load

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