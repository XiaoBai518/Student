package com.student.hbnu.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Configuration;


@Configuration
public class SpringContextUtil implements ApplicationContextAware {

	private static ApplicationContext applicationContext;
	

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		
		 SpringContextUtil.applicationContext = applicationContext;
		
	}


	public static ApplicationContext getApplicationContext(){
        return applicationContext;
    }



	


}
