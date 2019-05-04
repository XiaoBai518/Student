package com.student.hbnu.service.impl.Face;


import org.bytedeco.javacpp.DoublePointer;
import org.bytedeco.javacpp.IntPointer;
import org.bytedeco.javacpp.opencv_core.Mat;
import org.bytedeco.javacpp.opencv_face.FaceRecognizer;
import org.bytedeco.javacpp.opencv_face.LBPHFaceRecognizer;
import org.bytedeco.javacpp.opencv_imgcodecs;

import org.opencv.core.CvType;

import com.student.hbnu.constant.Constant;



public class FaceRecognise {

	
	public static int faceRecognise(int row,int col,byte[] grayImageByte) {
		Mat grayImage  = new Mat(row,col,CvType.CV_8UC1);
		grayImage.put(grayImage);
		opencv_imgcodecs.imwrite("D:\\oo.jpg", grayImage);
		FaceRecognizer faceRecognizer = LBPHFaceRecognizer.create();
		faceRecognizer.read(Constant.FACE_MODEL_PATH);
	
		IntPointer label = new IntPointer(1);
		DoublePointer confidence = new DoublePointer(1);

		faceRecognizer.predict(grayImage, label, confidence);
		faceRecognizer.close();
		return label.get(0);
	}
}
