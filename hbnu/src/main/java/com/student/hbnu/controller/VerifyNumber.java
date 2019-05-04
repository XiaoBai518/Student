package com.student.hbnu.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.student.hbnu.constant.Constant;
import com.student.hbnu.service.impl.verifyNumber.VerifyNumberServiceImpl;

@RestController
@RequestMapping("/verify")
public class VerifyNumber {
	@Resource
	public VerifyNumberServiceImpl verifyNumberServiceImpl;
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	
	@RequestMapping("/img")
	public void RandomVerify(HttpServletRequest request,HttpServletResponse response) {
		 logger.info("获取验证码");
		  HttpSession session = request.getSession();
		  Cookie[] cl = request.getCookies();
		  if(cl!=null) {
			  for(Cookie c :cl) {
					if(c.getName().equals("JSESSIONID")) {
						System.out.println("JSESSIONID"+c.getValue());
					}
				}
		  }
			
		  response.setContentType("image/jpeg");//设置相应类型,告诉浏览器输出的内容为图片
	      response.setHeader("Pragma", "No-cache");//设置响应头信息，告诉浏览器不要缓存此内容
	      response.setHeader("Cache-Control", "no-cache");
	      response.setDateHeader("Expire", 0);
 
	      BufferedImage image = new BufferedImage(Constant.VERIFY_IMG_WIDTH,Constant.VERIFY_IMG_HEIGTH,BufferedImage.TYPE_INT_BGR);
	      
	      String randomString = verifyNumberServiceImpl.ValidateCode(image);
	      
	      try {
			ImageIO.write(image, "JPEG", response.getOutputStream());//将内存中的图片通过流动形式输出到客户端
		} catch (IOException e) {

			e.printStackTrace();
		}
	     
	      session.removeAttribute(Constant.RANDOMCODEKEY);
	      session.setAttribute(Constant.RANDOMCODEKEY, randomString);    
	     
	}
	
	
	
	
}
