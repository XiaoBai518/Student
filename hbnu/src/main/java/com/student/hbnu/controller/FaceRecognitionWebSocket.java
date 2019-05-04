package com.student.hbnu.controller;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;

import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.objdetect.CascadeClassifier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.yeauty.annotation.OnBinary;
import org.yeauty.annotation.OnClose;
import org.yeauty.annotation.OnError;
import org.yeauty.annotation.OnMessage;
import org.yeauty.annotation.OnOpen;
import org.yeauty.annotation.ServerEndpoint;
import org.yeauty.pojo.ParameterMap;
import org.yeauty.pojo.Session;


import com.student.hbnu.service.impl.Face.FaceRecognise;
import com.student.hbnu.service.impl.user.UserServiceImpl;


import io.netty.handler.codec.http.HttpHeaders;

@ServerEndpoint(path="/faceRecognition",port=8082,maxFramePayloadLength=1000000)
@Component
public class FaceRecognitionWebSocket {
	//日志
		private Logger log = LoggerFactory.getLogger(this.getClass());
		
		//静态变量，用来记录当前在线连接数。
		 
	    private static AtomicInteger onlineCount = new AtomicInteger(0);
	 
	    //concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。若要实现服务端与单一客户端通信的话，可以使用Map来存放，其中Key可以为用户标识
	 
	    protected static CopyOnWriteArraySet<FaceRecognitionWebSocket> webSocketSet = new CopyOnWriteArraySet<FaceRecognitionWebSocket>();
	    
	    //与某个客户端的连接会话，需要通过它来给客户端发送数据
	    
	    private Session session;
	    
	    //用户业务逻辑层
	    @SuppressWarnings("unused")
		private  UserServiceImpl userServiceImpl;
	    
	//  //加载脸部分类器
	    CascadeClassifier faceDetector = new CascadeClassifier("D:\\Opencv4.0.1\\opencv\\sources\\data\\haarcascades\\haarcascade_frontalface_default.xml");
	    public FaceRecognitionWebSocket() {
	        log.info("面部信息识别  init...");
	    }
	    
	    /**
	     * 连接建立成功调用的方法
	     * @param session  可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
	     */
	    @OnOpen
	    public void onOpen(Session session,HttpHeaders headers, ParameterMap parameterMap){
	        this.session = session;
	        webSocketSet.add(this);     //加入set中
	 
	        addOnlineCount();           //在线数加1
	        session.setAttribute("count", 0);
	       log.info("有新连接加入！当前在线人数为" + getOnlineCount());
	      
	    }
	    
	   /**
	     * 收到客户端字节数组类型消息后调用的方法
	   * @param message 客户端发送过来的消息
	   * @param session 可选的参数
	   * @throws IOException 
	   */
	    @OnBinary
	    public void onBinary(Session session, byte[] message) throws IOException {
//	    	 int count = session.getAttribute("count");
//	    	 if(count>4) {
//	    		 int uid = session.getAttribute("uid");
//	    		 userServiceImpl = (UserServiceImpl) SpringContextUtil.getApplicationContext().getBean(UserServiceImpl.class);
//	    		 this.userServiceImpl.updateFaceData(uid, Constant.FACEDATA_OK);
//	    		 sendMessage(Constant.WEBSOCKET_CLOSE);
//	    	 }else {
	    	    	Mat image = Imgcodecs.imdecode(new MatOfByte(message), Imgcodecs.IMREAD_UNCHANGED);
	    	      	 Mat gray = image.clone();
	    	      	//图像灰度化。
	    	          Imgproc.cvtColor(image, gray, Imgproc.COLOR_BGR2GRAY);
	    	        //直方图均衡化，图像增强，暗的变亮，亮的变暗。
	    	         Imgproc.equalizeHist(gray,gray);
	    	         Imgcodecs.imwrite("D:\\II.jpg",gray);
	    	         byte [] grayData = new byte[gray.rows()*gray.cols()];
	    	         gray.get(gray.rows(), gray.cols(), grayData);
	    	        	 int uiid = FaceRecognise.faceRecognise(gray.rows(),gray.cols(),grayData);
//	    	        	 session.setAttribute("count", ++count);
	    	              sendMessage(uiid+"");
//	    	         //检测
//	    	         MatOfRect faceDetections = new MatOfRect();
//	    	         faceDetector.detectMultiScale(gray, faceDetections);
	    	         
//	    	         Mat faceROI = null;
//	    	         if(faceDetections.toArray().length==0) {
//	    	        	 //没有人脸数据
//	    	        	 sendMessage(Constant.FACEINFO_NOPEOPLE);
//	    	         }else if(faceDetections.toArray().length==1) {
//	    	       	     //获取脸部矩形区域
//	    	             faceROI = new Mat(image, faceDetections.toArray()[0]);
//	    	              //图像缩放。
//	    	              Imgproc.resize(faceROI,faceROI,new Size(92, 112),0,0,Imgproc.INTER_LINEAR);
//	    	              
//	    	              Imgcodecs.imwrite("F:\\faceCollection\\uid"+
//	    	            		  								session.getAttribute("uid")+
//	    	            		  								"0"+
//	    	            		  								count+
//	    	            		  								".jpg", faceROI);
//	    	              session.setAttribute("count", ++count);
//	    	              sendMessage("2");
//	    	         }else if(faceDetections.toArray().length>1){
//	    	       	  // 获取到多张面孔    弹出提示信息
//	    	       	  sendMessage(Constant.FACEINFO_MULTIPLEPEOPLE);
//	    	         }
//	    	 }
	    }
	    
	 
	    /**
	     * 连接关闭调用的方法
	     */
	    @OnClose
	    public void onClose(){
	        webSocketSet.remove(this);  //从set中删除
	 
	        subOnlineCount();           //在线数减1
	 
	        System.out.println("有一连接关闭！当前在线人数为" + getOnlineCount());
	    }

	    /**
	         * 收到客户端消息后调用的方法
	     * @param message 客户端发送过来的消息
	     * @param session 可选的参数
	     * @throws IOException 
	     */
	    @OnMessage
	    public void onMessage(String message, Session session) throws IOException {
	    	try {
	    		session.setAttribute("uid",Integer.parseInt(message));
			} catch (NumberFormatException e) {
				log.error("数值转换 出错，出错的 消息为"+message);
			}
	    	 
	    }
	 
	    /**
	         * 发生错误时调用
	     * @param session
	     * @param error
	     */
	    @OnError
	    public void onError(Session session, Throwable error){
	        log.error("面部收集器发生错误，错误信息为："+ error.getMessage());
	       
	    }
	 
	    /**
	     * 这个方法与上面几个方法不一样。没有用注解，是根据自己需要添加的方法。
	     * @param message
	     * @throws IOException
	     */
	    public void sendMessage(String message) throws IOException{
	 
	        this.session.sendText(message);
	 
	    }
	 
	    public static int getOnlineCount() {
	        return onlineCount.get();
	    }
	 
	    public static void addOnlineCount() {
	        onlineCount.incrementAndGet();
	    }
	 
	    public static void subOnlineCount() {
	        onlineCount.decrementAndGet();
	    }
}
