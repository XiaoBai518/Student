//package com.student.hbnu.controller;
//
//
//import java.io.IOException;
//import java.text.SimpleDateFormat;
//
//import java.util.Date;
//import java.util.concurrent.CopyOnWriteArraySet;
//import java.util.concurrent.atomic.AtomicInteger;
//
////import javax.websocket.OnClose;
////import javax.websocket.OnError;
////import javax.websocket.OnMessage;
////import javax.websocket.OnOpen;
////import javax.websocket.Session;
////import javax.websocket.server.ServerEndpoint;
//
//import org.opencv.core.Mat;
//import org.opencv.core.MatOfByte;
//import org.opencv.core.MatOfRect;
//import org.opencv.core.Size;
//import org.opencv.imgcodecs.Imgcodecs;
//import org.opencv.imgproc.Imgproc;
//import org.opencv.objdetect.CascadeClassifier;
//import org.springframework.stereotype.Component;
//import org.yeauty.annotation.OnBinary;
//import org.yeauty.annotation.OnClose;
//import org.yeauty.annotation.OnError;
//import org.yeauty.annotation.OnMessage;
//import org.yeauty.annotation.OnOpen;
//import org.yeauty.annotation.ServerEndpoint;
//import org.yeauty.pojo.ParameterMap;
//import org.yeauty.pojo.Session;
//
//import io.netty.handler.codec.http.HttpHeaders;
//
//
////@ServerEndpoint(path="/websocket",port=8081)
////@Component
//public class WebSocket {
//
//	//静态变量，用来记录当前在线连接数。
//	 
//    private static AtomicInteger onlineCount = new AtomicInteger(0);
// 
//    //concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。若要实现服务端与单一客户端通信的话，可以使用Map来存放，其中Key可以为用户标识
// 
//    protected static CopyOnWriteArraySet<WebSocket> webSocketSet = new CopyOnWriteArraySet<WebSocket>();
//    
//    //与某个客户端的连接会话，需要通过它来给客户端发送数据
//    
//    private Session session;
//    
////  //加载脸部分类器
//    CascadeClassifier faceDetector = new CascadeClassifier("D:\\Opencv4.0.1\\opencv\\sources\\data\\haarcascades\\haarcascade_frontalface_alt2.xml");
//    public WebSocket() {
//        System.out.println(" WebSocket init~~~");
//    }
//    
//    /**
//     * 连接建立成功调用的方法
//     * @param session  可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
//     */
//    @OnOpen
//    public void onOpen(Session session,HttpHeaders headers, ParameterMap parameterMap){
//        this.session = session;
//        webSocketSet.add(this);     //加入set中
// 
//        addOnlineCount();           //在线数加1
// 
//        System.out.println("有新连接加入！当前在线人数为" + getOnlineCount());
//    }
//    @OnBinary
//    public void onBinary(Session session, byte[] message) throws IOException {
//    	System.out.println("OnBinary");
//    	Mat image = Imgcodecs.imdecode(new MatOfByte(message), Imgcodecs.IMREAD_UNCHANGED);
//      	 Mat frame = image.clone();
//      	//图像灰度化。
//          Imgproc.cvtColor(image, image, Imgproc.COLOR_BGR2GRAY);
//        //直方图均衡化，图像增强，暗的变亮，亮的变暗。
//         Imgproc.equalizeHist(image,image);
//         
//         MatOfRect faceDetections = new MatOfRect();
//         faceDetector.detectMultiScale(image, faceDetections);
//         
//         Mat faceROI = null;
//         if(faceDetections.toArray().length==1) {
//       	  //获取脸部矩形区域。
//       	  System.out.println("长度"+faceDetections.toArray().length);
//             faceROI = new Mat(frame, faceDetections.toArray()[0]);
//              //图像缩放。
//              Imgproc.resize(faceROI,faceROI,new Size(92, 112),0,0,Imgproc.INTER_LINEAR);
//              
//              Imgcodecs.imwrite("D://faceData//s41//"+(new SimpleDateFormat("mmssSSS")).format( new Date())+".jpg", faceROI);  
//              System.out.println("asdasdas");
//         }else if(faceDetections.toArray().length>1){
//       	  //TODO 获取到多张面孔    弹出提示信息
//       	  System.out.println("请自己出镜~");
//       	  sendMessage("请自己出镜~");
//         }
////         for (Rect rect : faceDetections.toArray()) 
//    }
//    
// 
//    /**
//     * 连接关闭调用的方法
//     */
//    @OnClose
//    public void onClose(){
////        webSocketSet.remove(this);  //从set中删除
//// 
////        subOnlineCount();           //在线数减1
//// 
////        System.out.println("有一连接关闭！当前在线人数为" + getOnlineCount());
//    }
////    /**
////     * 收到客户端消息后调用的方法
////     * @param message 客户端发送过来的消息
////     * @param session 可选的参数
////     * @throws IOException 
////     */
////    @OnMessage
////    public void onMessage(byte[] message, Session session) throws IOException {
////    	Mat image = imdecode(new Mat(new BytePointer(message)), IMREAD_UNCHANGED);
////
////	   	 Mat frame = image.clone();
////	   	 Mat temp = null;
////	   	//图像灰度化。
//////	       cvtColor(image, temp, COLOR_BGR2GRAY);   
////	   	 
////	     //直方图均衡化，图像增强，暗的变亮，亮的变暗。
//////	      equalizeHist(image,temp);
////	      
////	      RectVector faceDetections = new RectVector();
////
////	      faceDetector.detectMultiScale(image, faceDetections);
////	      
////	      Mat faceROI = null;
////	    
////	   
////	      for (Rect rect :   faceDetections.get()) {
////
////	          //获取脸部矩形区域。
////	         faceROI = new Mat(frame, rect);
////	          //图像缩放。
////	         resize(faceROI,faceROI,new org.bytedeco.javacpp.opencv_core.Size(92, 112),0,0,INTER_LINEAR);
////	      }
////	      System.out.println("hhahah");
////	      imwrite("D://faceData//s41//"+(new SimpleDateFormat("mmssSSS")).format( new Date())+".jpg", faceROI);    
////    }
//    /**
//     * 收到客户端消息后调用的方法
//     * @param message 客户端发送过来的消息
//     * @param session 可选的参数
//     * @throws IOException 
//     */
//    @OnMessage
//    public void onMessage(String message, Session session) throws IOException {
//    	System.out.println("onmessage");
////       	Mat image = Imgcodecs.imdecode(new MatOfByte(message), Imgcodecs.IMREAD_UNCHANGED);
////   	 Mat frame = image.clone();
////   	//图像灰度化。
////       Imgproc.cvtColor(image, image, Imgproc.COLOR_BGR2GRAY);
////     //直方图均衡化，图像增强，暗的变亮，亮的变暗。
////      Imgproc.equalizeHist(image,image);
////      
////      MatOfRect faceDetections = new MatOfRect();
////      faceDetector.detectMultiScale(image, faceDetections);
////      
////      Mat faceROI = null;
////      if(faceDetections.toArray().length==1) {
////    	  //获取脸部矩形区域。
////    	  System.out.println("长度"+faceDetections.toArray().length);
////          faceROI = new Mat(frame, faceDetections.toArray()[0]);
////           //图像缩放。
////           Imgproc.resize(faceROI,faceROI,new Size(92, 112),0,0,Imgproc.INTER_LINEAR);
////           
////           Imgcodecs.imwrite("D://faceData//s41//"+(new SimpleDateFormat("mmssSSS")).format( new Date())+".jpg", faceROI);  
////      }else if(faceDetections.toArray().length>1){
////    	  //TODO 获取到多张面孔    弹出提示信息
////    	  System.out.println("请自己出镜~");
////    	  sendMessage("请自己出镜~");
////      }
//////      for (Rect rect : faceDetections.toArray()) 
//    }
// 
//    /**
//     * 发生错误时调用
//     * @param session
//     * @param error
//     */
//    @OnError
//    public void onError(Session session, Throwable error){
//        System.out.println("发生错误");
//        error.printStackTrace();
//    }
// 
//    /**
//     * 这个方法与上面几个方法不一样。没有用注解，是根据自己需要添加的方法。
//     * @param message
//     * @throws IOException
//     */
//
//    public void sendMessage(String message) throws IOException{
//    	System.out.println("发送消息");
//        this.session.sendText(message);
////        this.session.getAsyncRemote().sendText(message);
// 
//    }
// 
//    public static int getOnlineCount() {
//        return onlineCount.get();
//    }
// 
//    public static void addOnlineCount() {
//        onlineCount.incrementAndGet();
//    }
// 
//    public static void subOnlineCount() {
//        onlineCount.decrementAndGet();
//    }
// 
//}
//
