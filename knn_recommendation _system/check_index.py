#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 24 22:55:38 2022

@author: hong
"""

def check_index(target,feature_name,data):
    for i in range(len(data[feature_name].values)):
        if target == data[feature_name].values[i]:
            index = i
            return index