package com.student.hbnu.service.impl.netty;


import io.netty.channel.ChannelInitializer;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;

/**
 * 初始化连接时候的各个组件
 * @author 张小白
 *
 */
public class WebSocketChannelHandler extends ChannelInitializer<SocketChannel> {

	@Override
	protected void initChannel(SocketChannel ch) throws Exception {
		ch.pipeline().addLast("http-codec",new HttpServerCodec());
		ch.pipeline().addLast("aggregator",new HttpObjectAggregator(65536));
		ch.pipeline().addLast("handler",new WebSocketChannelHandler());
	}

}
