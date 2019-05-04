package com.teacher.socket;

import com.teacher.main.CaptureScreen;

import io.netty.bootstrap.Bootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioSocketChannel;

public class ClientSocket {
	public static void main(String[] arg) throws Exception {
        NioEventLoopGroup eventLoopGroup = new NioEventLoopGroup();

        try {
            Bootstrap bootstrap = new Bootstrap();
            bootstrap.group(eventLoopGroup).channel(NioSocketChannel.class)
                    .handler(new Clientinitializer());

            ChannelFuture channelFuture = bootstrap.connect("localhost", 9999).sync();

            Channel channel = channelFuture.channel();
           
               
            while(true) {
            	 channel.writeAndFlush(CaptureScreen.captureScreen());
            	 Thread.sleep(100);
            }
          

        } finally {
            eventLoopGroup.shutdownGracefully();
        }
    }
}