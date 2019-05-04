package com.student.hbnu.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebListener
public class InitOpencv implements ServletContextListener {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	  @Override
	    public void contextDestroyed(ServletContextEvent servletContextEvent) {

	    }

	    public void contextInitialized(ServletContextEvent arg0) {
	        System.load("D:/Opencv4.0.1/opencv/build/java/x64/opencv_java401.dll");
	        logger.info("opencv加载完成");
	    }
}
