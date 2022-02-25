#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 24 22:55:39 2022

@author: hong
"""

def knn_recommendation(random_status,data,num_recommendation):
    data_num = data.iloc[:,2:]
    data_matrix = np.matrix(data_num.values) 
    knn = NearestNeighbors(metric = 'cosine', algorithm='auto', leaf_size=30, n_neighbors=5, p=2,radius=1.0)
    knn.fit(data_matrix)
    
    if random_status == True:
        query_index = np.random.choice(data.shape[0])
    else:
        #title = input('Please input a song you like ヽ(○´∀`)ﾉ♪')
        ind = check_title_index(data)
        if type(ind) == int:
            query_index = ind
        else:
            return ind
     
    distances, indices = knn.kneighbors(data_matrix[query_index,:], n_neighbors=num_recommendation+1)
    indices = indices[0]
    indices = list(indices)
    indices.remove(query_index)
    print('Here are',num_recommendation,'recommended songs for you :)')
    for i in range(len(indices)):
        song_name = data.iloc[indices[i],:]['name']
        artists_lis = data.iloc[indices[i],:].artists
        artists_lis = ','.join(artists_lis)
        year = data.iloc[indices[i],:].year
        print('#',i+1)
        print('Song Name:',song_name)
        print('Artist Name:', artists_lis)
        print('The year of publication is:',year)
   