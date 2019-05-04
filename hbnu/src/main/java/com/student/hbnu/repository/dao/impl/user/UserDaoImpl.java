package com.student.hbnu.repository.dao.impl.user;


import com.student.hbnu.domain.Entity.user.User;
import com.student.hbnu.repository.dao.impl.BaseDaoImpl;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl extends BaseDaoImpl<User> {

	/**
	 * 根据邮箱   查询用户
	 * @param email
	 * @return
	 * @throws Exception
	 */
	public User getByEmail(String email) throws Exception {
		String hql = "from User where email=?";
		 return super.findOne(hql,new String[]{email});
		
	}
	/**
	 * 通过用户Id列表 查找用户
	 * @param idL
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<User> getListByIdList(List<Integer> idL) {
		
		String hql = "from User where id in (:idList)";
		Query query=super.getSession().createQuery(hql);
			query.setParameterList("idList", idL);

		return query.list();
	}
	
}
