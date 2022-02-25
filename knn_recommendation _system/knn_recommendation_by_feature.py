#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 24 22:56:16 2022

@author: hong
"""

def knn_recommendation_by_feature(data,num_recommendation):
    data_num = data.iloc[:,2:]
    data_matrix = np.matrix(data_num.values) 
    knn = NearestNeighbors(metric = 'cosine', algorithm='auto', leaf_size=30, n_neighbors=5, p=2,radius=1.0)
    knn.fit(data_matrix)
    
    feature_list = list(data_num.columns)
    feature_list.remove('year')
    feature_list.remove('duration_ms')
    
    
    print("♫♪˙‿˙♫♪ Hi, I am here to help you find songs that matches your mood ♫♪˙‿˙♫♪")
    print('\n')
    print("Please tell me which characteristic of music you care the most about ~")
    print("Here is a list of features:")
    print('\n')
    print(', '.join(feature_list))
    print('\n')
    inp = input("Please input the feature you want:")
    status = check_existence(inp,feature_list)
    
    while status == False:
        print('\n')
        print('(¬д¬。) The feature you input is not in our list. Please try to select a feature from the following list.')
        print('\n')
        print(', '.join(feature_list))
        inp = input("Please input the feature you want:")
        status = check_existence(inp,feature_list)
    
    print('\n')
    print("ヽ(•̀ω•́ )ゝ Copy that! The feature you selected is:",inp)
    print('\n')
    print('Please tell me how many percentage of', inp, 'do you want:')
    lvl = input("Input percentage:")
    status2 = check_percentage(lvl)
    while status2 == False:
        print('\n')
        print('(¬д¬。) You did not input a correct number. Pertcentage is fractional number in range [0,1]. Please try again.')
        print('\n')
        lvl = input("Input percentage:")
        status2 = check_percentage(lvl)
    lvl = float(lvl)
    target = data2[inp].quantile(q = lvl,interpolation='nearest')
    query_index = check_index(target,inp,data)
    
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
        print('#',i+1,"♪(´∇`*)")
        print('Song Name:',song_name)
        print('Artist Name:', artists_lis)
        print('The year of publication is:',year)