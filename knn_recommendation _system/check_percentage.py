#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Feb 24 22:56:05 2022

@author: hong
"""

def check_percentage(lvl):
    try:
        val = float(lvl)
    except ValueError:
        return False
    
    lvl = float(lvl)
    
    if lvl>1 or lvl<0:
        return False
    else:
        return True