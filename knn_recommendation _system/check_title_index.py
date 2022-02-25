#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 24 22:55:29 2022

@author: hong
"""

def check_title_index(data):
    title = input('Please in put a song you like ヽ(○´∀`)ﾉ♪')
    warning = 'The song you want to search does not exist in Spotify dataset. Please Try another one :('
    
    for i in range(len(data['name'])):
        if title.lower() == data['name'].values[i].lower():
            index = i
            break
        else:
            index = 'none'
    if index != 'none':
        return index
    if index == 'none':
        return warning