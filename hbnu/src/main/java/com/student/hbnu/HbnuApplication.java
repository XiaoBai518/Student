package com.student.hbnu;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.student.hbnu.socket.ServerSocket;


@SpringBootApplication
@ServletComponentScan
@EntityScan(basePackages="com.student.hbnu.domain.Entity")
@EnableJpaRepositories
public class HbnuApplication {
	
	public static void main(String[] args) throws InterruptedException  {
		SpringApplication.run(HbnuApplication.class, args);
		
		//教师端Socket Server端启动
			ServerSocket.serverStart();
		
	}


}
