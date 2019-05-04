package com.student.hbnu.service.impl.Face;



import static org.bytedeco.javacpp.opencv_core.CV_32SC1;
import static org.bytedeco.javacpp.opencv_imgcodecs.*;

import java.io.File;
import java.io.FilenameFilter;
import java.nio.IntBuffer;

import org.bytedeco.javacpp.opencv_core.Mat;
import org.bytedeco.javacpp.opencv_core.MatVector;
import org.bytedeco.javacpp.opencv_face.FaceRecognizer;
import org.bytedeco.javacpp.opencv_face.LBPHFaceRecognizer;

import org.springframework.stereotype.Service;



import com.student.hbnu.constant.Constant;


@Service
public class Train {
	
	/**
	 * 初始训练
	 */
	public  void initTrain() {
		File root = new File(Constant.FACE_IMAGE_PATH);
		 //图片过滤器
		FilenameFilter imgFilter = new FilenameFilter() {
			public boolean accept(File dir, String name) {
				return name.endsWith(".jpg") || name.endsWith(".pgm") || name.endsWith(".png");
			}
		};
		
		File[] imgFiles = root.listFiles(imgFilter);

		MatVector images  = new MatVector(imgFiles.length);;
		Mat labels = new Mat(imgFiles.length, 1, CV_32SC1);
		IntBuffer labelsBuf = labels.createBuffer();

		int counter = 0;
		
		for (File image : imgFiles) {
			Mat img = imread(image.getAbsolutePath(), IMREAD_GRAYSCALE);
			int label = Integer.parseInt(image.getName().split("-")[0]);
			images.put(counter, img);
			labelsBuf.put(counter, label);
			counter++;
		}
	
		FaceRecognizer faceRecognizer = LBPHFaceRecognizer.create();
		faceRecognizer.train(images, labels);
		faceRecognizer.save(Constant.FACE_MODEL_PATH);
		faceRecognizer.close();
	}
	
	

	/**
	 * 增量训练
	 */
	public  void incrementalTrain(int uid) {
	
		
		File root = new File(Constant.FACE_IMAGE_PATH);
		
		FilenameFilter imgFilter = new FilenameFilter() {
			public boolean accept(File dir, String name) {
				return name.endsWith(".jpg") || name.endsWith(".pgm") || name.endsWith(".png") || name.split("-")[0].equals(""+uid);
			}
		};
		File[] imgFiles = root.listFiles(imgFilter);
		
		MatVector images  = new MatVector(imgFiles.length);
		Mat labels = new Mat(imgFiles.length, 1, CV_32SC1);
		IntBuffer labelsBuf = labels.createBuffer();

		int counter = 0;
		
		for (File image : imgFiles) {
			Mat img = imread(image.getAbsolutePath(), IMREAD_GRAYSCALE);
			int label = uid;
			images.put(counter, img);
			labelsBuf.put(counter, label);
			counter++;
		}
		
		
		FaceRecognizer faceRecognizer = LBPHFaceRecognizer.create();		
		faceRecognizer.read(Constant.FACE_MODEL_PATH);;
		faceRecognizer.update(images, labels);
		faceRecognizer.close();
	}
}
