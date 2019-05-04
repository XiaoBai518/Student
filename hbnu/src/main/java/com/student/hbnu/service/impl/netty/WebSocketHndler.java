//package com.student.hbnu.service.impl.netty;
//
//import java.util.Date;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import com.student.hbnu.constant.Constant;
//
//import io.netty.buffer.ByteBuf;
//import io.netty.buffer.Unpooled;
//import io.netty.channel.ChannelFuture;
//import io.netty.channel.ChannelFutureListener;
//import io.netty.channel.ChannelHandlerContext;
//import io.netty.channel.SimpleChannelInboundHandler;
//import io.netty.handler.codec.http.DefaultFullHttpResponse;
//import io.netty.handler.codec.http.FullHttpRequest;
//import io.netty.handler.codec.http.HttpResponseStatus;
//import io.netty.handler.codec.http.HttpVersion;
//import io.netty.handler.codec.http.websocketx.CloseWebSocketFrame;
//import io.netty.handler.codec.http.websocketx.PingWebSocketFrame;
//import io.netty.handler.codec.http.websocketx.PongWebSocketFrame;
//import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
//import io.netty.handler.codec.http.websocketx.WebSocketFrame;
//import io.netty.handler.codec.http.websocketx.WebSocketServerHandshaker;
//import io.netty.handler.codec.http.websocketx.WebSocketServerHandshakerFactory;
//import io.netty.util.CharsetUtil;
//
///**
// * 接受处理响应客户端 websocket请求的核心业务处理类
// * @author 张小白
// *
// */
//public class WebSocketHndler extends SimpleChannelInboundHandler<Object> {
//	private Logger logger = LoggerFactory.getLogger(this.getClass());
//	private WebSocketServerHandshaker handShaker;
//	/**
//	 * 服务端处理客户端 WebSocket请求的核心方法
//	 */
//	protected void messageReceived(ChannelHandlerContext ctx, Object msg) throws Exception {
//		//处理客户端向服务端发起http请求的握手请求
//		if(msg instanceof FullHttpRequest) {
//			handHttpRequest(ctx, (FullHttpRequest)msg);
//		}else if(msg instanceof WebSocketFrame){//处理websocket连接业务
//			handWebsocketFrame(ctx, (WebSocketFrame)msg);
//			
//		}	
//	}
//	/**
//	 * 处理客户端与服务端年之间的  websocket 业务
//	 * @param ctx
//	 */
//	private void handWebsocketFrame(ChannelHandlerContext ctx,WebSocketFrame frame) {
//		//判断是否是关闭websocket的指令
//		if(frame instanceof CloseWebSocketFrame) {
//			handShaker.close(ctx.channel(), (CloseWebSocketFrame)frame.retain());
//		}
//		//判断是否是Ping消息
//		if(frame instanceof PingWebSocketFrame) {
//			ctx.channel().write(new PongWebSocketFrame(frame.content().retain()));
//			return;
//		}
//		//判断是否是 二进制消息，如果是二进制消息。抛出异常
//		if(!(frame instanceof TextWebSocketFrame)) {
//			logger.error("目前不支持二进制消息");
//			throw new RuntimeException(this.getClass().getName()+"不支持此类型消息");
//		}
//		//返回应答消息
//		//获取客户端像服务端发送的消息
//		String request = ((TextWebSocketFrame)frame).text();
//		logger.info("服务端收到客户端的消息。。。"+request);
//		TextWebSocketFrame tws = new TextWebSocketFrame(new Date().toString()+ctx.channel().id()+"===>>>"+request);
//		
//		//群发 服务端向每个连接上来的客户端群发消息
//		NettyConfig.group.writeAndFlush(tws);
//	}
//	/**
//	 * 处理客户端服务器端发起的http握手请求的业务
//	 * @param ctx
//	 * @param req
//	 */
//	private void handHttpRequest(ChannelHandlerContext ctx,FullHttpRequest req) {
//		if(!req.getDecoderResult().isSuccess() || !("websocket").equals(req.headers().get("Upgrade"))) {
//			this.sendHttpResponse(ctx, req, new DefaultFullHttpResponse(HttpVersion.HTTP_1_1,HttpResponseStatus.BAD_REQUEST));
//			return;
//		}else {
//			WebSocketServerHandshakerFactory wsFactory = new WebSocketServerHandshakerFactory(Constant.URL_WEBSOCKET,null, false);
//			handShaker = wsFactory.newHandshaker(req);
//			if(handShaker == null) {
//				WebSocketServerHandshakerFactory.sendUnsupportedWebSocketVersionResponse(ctx.channel());
//			}else {
//				handShaker.handshake(ctx.channel(), req);
//			}
//		}
//	}
//	/**
//	 * 服务端向客户端响应信息
//	 * @param ctx
//	 * @param req
//	 */
//	private void sendHttpResponse(ChannelHandlerContext ctx,FullHttpRequest req,DefaultFullHttpResponse res) {
//		if(res.getStatus().code()!=200) {
//			ByteBuf buf = Unpooled.copiedBuffer(res.getStatus().toString(),CharsetUtil.UTF_8);
//			res.content().writeBytes(buf);
//			buf.release();
//		}
//		//服务端向客户端发送数据
//		ChannelFuture f = ctx.channel().writeAndFlush(res);
//		if(res.getStatus().code()!=200) {
//			f.addListener(ChannelFutureListener.CLOSE);
//		}
//	}
//	/**
//	 * 工程出现异常的时候调用
//	 */
//	@Override
//	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
//		logger.error(cause.getMessage());
//		ctx.close();
//	}
//
//	/**
//	 * 客户端与服务端创建连接时调用
//	 */
//	@Override
//	public void channelActive(ChannelHandlerContext ctx) throws Exception {
//		NettyConfig.group.add(ctx.channel());
//		logger.info("客户端与服务端连接开启...");
//	}
//	/**
//	 * 客户端与服务端断开连接时调用
//	 */
//	@Override
//	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
//		NettyConfig.group.remove(ctx.channel());
//		logger.info("客户端与服务端连接关闭...");
//	} 
//	/**
//	 * 服务端接受客户端发送过来的数据结束之后调用
//	 */
//	@Override
//	public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
//		ctx.flush();
//	}
////	
//
//
//
//}
