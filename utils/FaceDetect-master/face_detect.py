import cv2
import dlib
import numpy as np
import os
from os import listdir
from os.path import isfile, join

# Get user supplied values

mypath = "/Users/bomoon/Desktop/layoutit/src/imgs/gaymer/"

# imagePath = img_path
cascPath = "haarcascade_frontalface_default.xml"

# Create the haar cascade
faceCascade = cv2.CascadeClassifier(cascPath)

# FILE_PATH = '/Users/bomoon/Desktop/Project/shape_predictor_68_face_landmarks.dat'
# detector = dlib.get_frontal_face_detector()
# predictor = dlib.shape_predictor(FILE_PATH)

counter = 0

# Read the image
onlyfiles = [mypath + f for f in listdir(mypath) if isfile(join(mypath, f)) and (f[0] != '.')]
print onlyfiles
for path in onlyfiles:
	image = cv2.imread(path)
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

	# Detect faces in the image
	faces = faceCascade.detectMultiScale(
	    gray,
	    scaleFactor=1.1,
	    minNeighbors=12,
	    minSize=(30, 30),
	    flags = cv2.cv.CV_HAAR_SCALE_IMAGE
	)
	
	# rects = detector(image, 1)
	# if len(rects) == 0:
	# 	continue
	# box = rects[0]

	print counter
	# border = 100
	# y1 = max(0, box.top() - border)
	# y2 = min(image.shape[1], box.bottom() + border)
	# x1 = max(0, box.left() - border)
	# x2 = min(image.shape[0], box.right() + border)

	# subimg = image[y1:y2,x1:x2]
	# cv2.imwrite("cropped/img%d.png" % (counter), subimg)
	# counter += 1

	# Draw a rectangle around the faces
	for (x, y, w, h) in faces:
	    # cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)

	    subimg = image[y:(y+h),x:(x+w)]
	    cv2.imwrite("cropped/img%d.png" % (counter), subimg)
	    counter += 1

	# cv2.imshow("Faces found", subimg)
	# cv2.waitKey(0)


