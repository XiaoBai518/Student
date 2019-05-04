package com.student.hbnu.controller;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Component;

import org.yeauty.annotation.OnBinary;
import org.yeauty.annotation.OnClose;
import org.yeauty.annotation.OnError;
import org.yeauty.annotation.OnMessage;
import org.yeauty.annotation.OnOpen;
import org.yeauty.annotation.ServerEndpoint;
import org.yeauty.pojo.ParameterMap;
import org.yeauty.pojo.Session;

import com.student.hbnu.constant.Constant;

import io.netty.handler.codec.http.HttpHeaders;
import sun.misc.BASE64Decoder;

@ServerEndpoint(path="/teachersocket",port=8083,maxFramePayloadLength=1000000)
@Component
public class TeacherSocket {

	//静态变量，用来记录当前在线连接数。
	 
    private static AtomicInteger onlineCount = new AtomicInteger(0);
 
//    //concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。若要实现服务端与单一客户端通信的话，可以使用Map来存放，其中Key可以为用户标识
// 
//    protected static CopyOnWriteArraySet<TeacherSocket> webSocketSet = new CopyOnWriteArraySet<TeacherSocket>();
 
    //与某个客户端的连接会话，需要通过它来给客户端发送数据
 
    private Session session;
   private static  int count = 0;
    
    /**
     * 连接建立成功调用的方法
     * @param session  可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
     */
    @OnOpen
    public void onOpen(Session session,HttpHeaders headers, ParameterMap parameterMap){
        this.session = session;
        Constant.webSocketSet.add(this);     //加入set中
 
        addOnlineCount();           //在线数加1
 
        System.out.println("有新连接加入！当前在线人数为" + getOnlineCount());
    }
    @OnBinary
    public void onBinary(Session session, byte[] message) throws IOException {

        OutputStream imageStream = new FileOutputStream(new File("D:\\result\\"+count+".jpg"));
        imageStream.write(message);
        imageStream.flush();
        imageStream.close();    
        count++;

    }
    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(){
    	Constant.webSocketSet.remove(this);  //从set中删除
 
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
    	if(message.indexOf("data:image/jpeg;base64")>=0) {
    		System.out.println("123");
    		// 通过base64来转化图片
            message = message.replaceAll("data:image/jpeg;base64,", "");      
            BASE64Decoder decoder = new BASE64Decoder();
            // Base64解码      
            byte[] imageByte = null;
            try {
                imageByte = decoder.decodeBuffer(message);      
                for (int i = 0; i < imageByte.length; ++i) {      
                    if (imageByte[i] < 0) {// 调整异常数据      
                        imageByte[i] += 256;      
                    }      
                }      
            } catch (Exception e) {
                 e.printStackTrace(); 
            }   
            
            OutputStream imageStream = new FileOutputStream(new File("D:\\result\\"+count+".jpg"));
            imageStream.write(imageByte);
            imageStream.flush();
            imageStream.close();    
            count++;
    	}else {
    		System.out.println(message);
    	}
    	
    }
 
    /**
     * 发生错误时调用
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error){
        System.out.println("发生错误");
        error.printStackTrace();
    }
 
    /**
     * 这个方法与上面几个方法不一样。没有用注解，是根据自己需要添加的方法。
     * @param message
     * @throws IOException
     */
    public void sendMessage(String message) throws IOException{
    	System.out.println("发送消息");
        this.session.sendText(message);
        //this.session.getAsyncRemote().sendText(message);
 
    }
    /**
     * 这个方法与上面几个方法不一样。没有用注解，是根据自己需要添加的方法。
     * @param message
     * @throws IOException
     */
    public void sendMessage(byte [] message) throws IOException{
    	System.out.println("发送消息");
        this.session.sendBinary(message);
        //this.session.getAsyncRemote().sendText(message);
 
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

