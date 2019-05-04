package com.student.hbnu.socket;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.codec.LengthFieldBasedFrameDecoder;
import io.netty.handler.codec.LengthFieldPrepender;
import io.netty.handler.codec.bytes.ByteArrayDecoder;
import io.netty.handler.codec.bytes.ByteArrayEncoder;

public class ServerInitializer extends ChannelInitializer<SocketChannel> {
	


	@Override
	protected void initChannel(SocketChannel ch) throws Exception {
		  ChannelPipeline pipeline = ch.pipeline();

	      //数据分包，组包，粘包
	      pipeline.addLast(new LengthFieldBasedFrameDecoder(Integer.MAX_VALUE,0,4,0,4));
	      pipeline.addLast(new LengthFieldPrepender(4));

//	      pipeline.addLast(new StringDecoder(CharsetUtil.UTF_8));
//	      pipeline.addLast(new StringEncoder(CharsetUtil.UTF_8));
	      pipeline.addLast(new ByteArrayDecoder());
	      pipeline.addLast(new ByteArrayEncoder());

	      pipeline.addLast(new ServerHandler());
	}
}
