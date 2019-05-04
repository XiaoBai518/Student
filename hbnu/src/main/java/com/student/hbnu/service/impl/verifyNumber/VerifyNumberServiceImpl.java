package com.student.hbnu.service.impl.verifyNumber;

import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.student.hbnu.constant.Constant;
import com.student.hbnu.util.verifyNumber.RandomValidateCode;


@Service
public class VerifyNumberServiceImpl {

	@Resource
	public RandomValidateCode randomValidateCode;
	
	/**
	 * 生成验证码
	 * @param image
	 * @return randString
	 */
	public String ValidateCode(BufferedImage image) {
				
	        //BufferedImage类是具有缓冲区的Image类,Image类是用于描述图像信息的类
	       
	        Graphics g = image.getGraphics();//产生Image对象的Graphics对象,改对象可以在图像上进行各种绘制操作
	        g.fillRect(0, 0, Constant.VERIFY_IMG_WIDTH, Constant.VERIFY_IMG_HEIGTH);
	        g.setFont(new Font("Times New Roman",Font.ROMAN_BASELINE,18));
	        g.setColor(randomValidateCode.getRandColor(110, 133));
	        
	        
	        //绘制干扰线
	        for(int i=0;i<=Constant.VERIFY_IMG_LINESIZE;i++){
	        	randomValidateCode.drowLine(g);
	        }
	        
	        //绘制随机字符
	        String randomString = "";
	        for(int i=1;i<=Constant.VERIFY_IMG_STRINGNUM;i++){
	            randomString=randomValidateCode.drowString(g,randomString,i);
	        }
	        
	   
	        g.dispose();
	        
	        return randomString;
	}
	
}
