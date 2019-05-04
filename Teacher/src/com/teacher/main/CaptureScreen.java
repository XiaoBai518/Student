package com.teacher.main;

import java.awt.Dimension;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;

import javax.imageio.ImageIO;

public class CaptureScreen {
	 public static void captureScreen(String fileName, String folder) throws Exception {
		 
	        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
	        Rectangle screenRectangle = new Rectangle(screenSize);
	        Robot robot = new Robot();
	        BufferedImage image = robot.createScreenCapture(screenRectangle);
	        // 截图保存的路径 
	        File screenFile = new File(fileName);    
	        // 如果路径不存在,则创建  
	        if (!screenFile.getParentFile().exists()) {  
	            screenFile.getParentFile().mkdirs();  
	        } 
	        //判断文件是否存在，不存在就创建文件
	        if(!screenFile.exists()&& !screenFile .isDirectory()) {
	            screenFile.mkdir();
	        }
	        
	        File f = new File(screenFile, folder);        
	        ImageIO.write(image, "png", f);
	    }
	 public static byte [] captureScreen() throws Exception {
		 
	        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
	        Rectangle screenRectangle = new Rectangle(screenSize);
	        Robot robot = new Robot();
	        BufferedImage image = robot.createScreenCapture(screenRectangle);
	        ByteArrayOutputStream output = new ByteArrayOutputStream();
	        ImageIO.write(image,"jpg",output);
	        return output.toByteArray();
	    }

}
