import cv2
import dlib
import numpy as np
import os
from os import listdir
from os.path import isfile, join

mypath = "cropped/"

onlyfiles = [mypath + f for f in listdir(mypath) if isfile(join(mypath, f)) and (f[0] != '.')]
counter = 0
for f in onlyfiles:
	os.rename(f, "gaymer_faces/img" + str(counter) + ".png")
	counter += 1