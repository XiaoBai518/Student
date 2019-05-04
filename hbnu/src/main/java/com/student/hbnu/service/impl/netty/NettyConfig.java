package com.student.hbnu.service.impl.netty;


import io.netty.channel.group.DefaultChannelGroup;
import io.netty.util.concurrent.GlobalEventExecutor;
import io.netty.channel.group.ChannelGroup;


/**
 * 存储整个工程的全局配置
 * @author 张小白
 *
 */
public class NettyConfig {

	/*
	 * 存储每一个客户端接入进来时的Channel
	 */
	public static ChannelGroup group = new DefaultChannelGroup(GlobalEventExecutor.INSTANCE);
}
