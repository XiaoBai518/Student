package com.student.hbnu.socket;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;

public class ServerSocket {
    public static void serverStart() throws InterruptedException  {
        //负责接收客户端连接
        NioEventLoopGroup bossGroup = new NioEventLoopGroup();

        //负责处理连接
        NioEventLoopGroup wokerGroup = new NioEventLoopGroup();

        try{
        	System.out.println("ServerSocket开启成功");
            ServerBootstrap bootstrap = new ServerBootstrap();

            bootstrap.group(bossGroup,wokerGroup)
                    .channel(NioServerSocketChannel.class)
                    .childHandler(new ServerInitializer());

            //绑定端口号
            ChannelFuture channelFuture = bootstrap.bind(9999).sync();
            
            channelFuture.channel().closeFuture().sync();
           

        } finally {
            bossGroup.shutdownGracefully();
            wokerGroup.shutdownGracefully();
        }

    }
}
