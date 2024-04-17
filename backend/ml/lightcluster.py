import time
from db import sensor_data_collection

import numpy as np
import pandas as pd
from sklearn.cluster import KMeans

from joblib import dump, load



def main():
    
    print('Starting light cluster training process')
    
    np.random.seed(int(round(time.time())))

    while True:

        try:                  
            
            data = sensor_data_collection.find({},{'humidity': 0, 'temperature': 0})

            # Convert MongoDB cursor to list of dictionaries
            data_list = list(data)

            # Convert list of dictionaries to DataFrame
            df = pd.DataFrame(data_list)
            
            X = df['lightLevel'].values.reshape(-1,1)
            
            # print(X)
            
            kmeans = KMeans(n_clusters=3, random_state=0)
            kmeans = kmeans.fit(X)
            result = pd.concat([df['lightLevel'], pd.DataFrame({'cluster':kmeans.labels_})], axis=1)
            
            # print(result)
            
            for cluster in result.cluster.unique():
                print('{:d}\t{:.3f} ({:.3f})'.format(cluster, result[result.cluster==cluster].lightLevel.mean(), result[result.cluster==cluster].lightLevel.std()))
            
            
            dump(kmeans, 'lightcluster.joblib')
            
            time.sleep(10)
                           

        except Exception as error:

            print('Error: {}'.format(error.args[0]))
            continue

        except KeyboardInterrupt:

            print('Program terminating...')    
            break



if __name__ == '__main__':
    
    main()
