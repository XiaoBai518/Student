package com.student.hbnu.service.impl.netty;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.Channel;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;

public class Main {

	private  Logger logger = LoggerFactory.getLogger(this.getClass());
	
	public  void main() {
		EventLoopGroup bossGroup = new NioEventLoopGroup();
		EventLoopGroup workGroup = new NioEventLoopGroup();
		
		try {
			ServerBootstrap b = new ServerBootstrap();
			b.group(bossGroup,workGroup);
			b.channel(NioServerSocketChannel.class);
			logger.info("服务端开启等待客户端连接。。。");
			
			Channel ch = b.bind(8080).sync().channel();
			ch.closeFuture().sync();
			
		} catch (Exception e) {
			// TODO: handle exception
		}finally {
			
			bossGroup.shutdownGracefully();
			workGroup.shutdownGracefully();
		}
	}
}
