package com.teacher.socket;

import java.time.LocalDateTime;

import com.teacher.main.CaptureScreen;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;

public class ClientHandler extends SimpleChannelInboundHandler<String> {

    //和服务器建立连接
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
  
      ctx.writeAndFlush(CaptureScreen.captureScreen());
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        cause.printStackTrace();
        ctx.close();
    }

	@Override
	protected void messageReceived(ChannelHandlerContext ctx, String msg) throws Exception {
		 System.out.println("客户端接收到的消息： "+msg);

	        ctx.writeAndFlush(LocalDateTime.now());


		
	}

}
