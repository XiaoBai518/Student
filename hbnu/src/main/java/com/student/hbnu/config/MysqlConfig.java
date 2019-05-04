package com.student.hbnu.config;

import org.hibernate.dialect.MySQL5InnoDBDialect;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MysqlConfig extends MySQL5InnoDBDialect {

	
	  @Override
	    public String getTableTypeString() {
	        return " ENGINE=InnoDB DEFAULT CHARSET=utf8";
	    }
}
