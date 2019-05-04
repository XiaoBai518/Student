package com.student.hbnu.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.student.hbnu.Interceptor.AjaxIntercepter;

@Configuration
public class InterceptorConfig extends WebMvcConfigurerAdapter {

	 @Bean
	    public AjaxIntercepter ajaxInterceptor() {
	        return new AjaxIntercepter();
	    }
	 
	    @Override
	    public void addInterceptors(InterceptorRegistry registry) {
	    registry.addInterceptor(ajaxInterceptor()).excludePathPatterns("/static/*")
	                .excludePathPatterns("/error").addPathPatterns("/**");
	    }

		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/**")
            //设置允许跨域请求的域名
            .allowedOrigins("*")
            //是否允许证书 不再默认开启
            .allowCredentials(true)
            //设置允许的方法
            .allowedMethods("*")
            //跨域允许时间
            .maxAge(3600);
		}

}
