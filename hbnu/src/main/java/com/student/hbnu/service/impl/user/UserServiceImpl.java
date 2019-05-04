package com.student.hbnu.service.impl.user;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.student.hbnu.constant.Constant;
import com.student.hbnu.domain.Entity.user.User;
import com.student.hbnu.repository.dao.impl.user.UserDaoImpl;
import com.student.hbnu.service.impl.Face.Train;

@Service
@Transactional(readOnly=false)
public class UserServiceImpl{
	//日志
	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Resource
	private UserDaoImpl userDaoImpl;
	@Resource
	private Train train;
	
	/**
	 * 注册
	 * @param role
	 * @param entity
	 * @return
	 */
	public int register(User user) {
		logger.info("开始注册service");
		User u=null;
			try {
				u = this.userDaoImpl.getByEmail(user.getEmail());
				if(u==null) {
					this.userDaoImpl.save(user);
					logger.info("注册成功service");
					return 1;
				}else {
					logger.info("账号已注册");
					return 0;
				}
			} catch (Exception e) {
				logger.error(e.getMessage());
				return 0;
			}	
	}
	/**
	 * 登陆
	 * @param user
	 * @return
	 */
	public User login (User user) {
		try {
			User u = this.getByEmail(user.getEmail());
			//查看是否存在 此用户存在
			if(u!=null) {
				if(u.getPassword().equals(user.getPassword())) {
					logger.info("登陆成功");
					return u;
				}else {
					//密码错误
					return new User(Constant.ERROINFO_PASSWORDERRO);
				}
			}else{
				logger.info("未查询到用户");
				return null;
			}
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
			return null;
		}
		
	}
	/**
	 * 根据Id判断 用户  是学生还是老师
	 * @param id
	 * @return
	 */
	public int getRoleById(int id) {
		
		try {
			User u = this.userDaoImpl.get(id);
			if(u!=null) {
				return u.getRole();
			}else {
				logger.info("没有该用户");
				return 2;
			}
		} catch (Exception e) {

			logger.error(e.getMessage());
			logger.error("查询过程出错");
			return 3;
		}
		
		
		
	}
	/**
	  * 通过Id 获取用户实体
	 * @param id
	 * @return
	 */
	public User getById(int id) {
		User u = null;
		try {
			u = this.userDaoImpl.get(id);
		} catch (Exception e) {

			logger.error(e.getMessage());
		}
		
		 return u;
	}
	/**
	  * 更新用户
	 * @param id
	 * @return
	 */
	public void update(User user) {
		this.userDaoImpl.update(user);
	}
	/**
	 * 通过用户Id列表 查找用户
	 * @param idList
	 * @return
	 */
	public List<User> getListByIdList(List<Integer> idList) {
		return this.userDaoImpl.getListByIdList(idList);
	}
	/**
	 * 通过Email  获取用户实体
	 * @param email
	 * @return
	 */
	public User getByEmail(String email) {
			User u = null;
			 try {
				 u = this.userDaoImpl.getByEmail(email);
				
			} catch (Exception e) {
				
				logger.error(e.getMessage());
			}
			 return u;
	}
	/**
	 * 更新人脸数据
	 * @param facedata
	 */
	public void updateFaceData(int uid,int facedata) {
		User u;
		try {
			this.train.incrementalTrain(uid);
			u = this.userDaoImpl.get(uid);
			u.setFaceData(facedata);
			
			this.userDaoImpl.update(u);
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}
		
	}
}
