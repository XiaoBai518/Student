package com.student.hbnu.socket;

import java.io.IOException;
import java.util.UUID;

import com.student.hbnu.constant.Constant;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

public class ServerHandler extends SimpleChannelInboundHandler<byte[]> {
	 @Override
     public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws  Exception {
         cause.printStackTrace();
         ctx.close();
     }
	@Override
	protected void channelRead0(ChannelHandlerContext ctx, byte[] msg) throws Exception {
//		 //接收到的数据
		 new Thread(new Runnable() {
				@Override
				public void run() {
					Constant.webSocketSet.forEach(ws->{
						try {
							ws.sendMessage(msg);
						} catch (IOException e) {
							// TODO 自动生成的 catch 块
							e.printStackTrace();
						}
					});;
					
				}
			}).run();;
        //返回给客户端的数据
		
//      OutputStream imageStream = new FileOutputStream(new File("D:\\result\\"+System.currentTimeMillis()+".jpg"));
//      imageStream.write(msg);
//      imageStream.flush();
//      imageStream.close();
		
        ctx.channel().writeAndFlush("server: "+ UUID.randomUUID());

		
	}
}
