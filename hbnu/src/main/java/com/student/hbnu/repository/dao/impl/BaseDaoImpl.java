package com.student.hbnu.repository.dao.impl;

import java.io.Serializable;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.SQLQuery;

import org.springframework.beans.factory.annotation.Autowired;
@SuppressWarnings("unchecked")
public class BaseDaoImpl<T>  {

	private Class<T> entityClass; //T的具体类
	@Autowired
	private SessionFactory sessionFactory;

    /**
     * 通过构造方法指定DAO的具体实现类
     */
	  
	public BaseDaoImpl(){
			this.entityClass = null;
			@SuppressWarnings("rawtypes")
			Class c = getClass();
			Type t = c.getGenericSuperclass();
			if (t instanceof ParameterizedType) {
				Type[] p = ((ParameterizedType) t).getActualTypeArguments();
				this.entityClass = (Class<T>) p[0];
			}
	}

    /**
     * 获取当前工作的Session
     */
    protected Session getSession(){
        return sessionFactory.getCurrentSession();
    }


  
	/**
	 * 
	 * @desc 获取SessionFactory
	 * @author zhangtianrun
	 * @createDate 2018年3月29日
	 * @return SessionFactory
	 */
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	
	
	
	//**************基本增删改查*********************
	
    public void save(T entity) {
		this.sessionFactory.getCurrentSession().save(entity);
	}
	
    public void update(T entity) {
		this.sessionFactory.getCurrentSession().update(entity);
		this.sessionFactory.getCurrentSession().flush();
	}

	
    public void delete(Object entity)  {
    	
		this.sessionFactory.getCurrentSession().delete(entity);
	}

    public void delete(Serializable id)  {
		this.delete(this.sessionFactory.getCurrentSession().load(entityClass,id));
	}
	
    public T get(Serializable id) throws Exception {
		return (T)this.sessionFactory.getCurrentSession().get(entityClass, id);
	}

	
    public T load(Serializable id) throws Exception {
		return (T)this.sessionFactory.getCurrentSession().load(entityClass, id);
	}
    
	//**************HQL***************************
    /**
	 * 
	 * @desc 查询单个数据
	 * @author wangwei
	 * @createDate 2014年9月5日
	 * @return
	 * @throws Exception
	 */
    public T findOne(String hql, Object[] params) throws Exception {
		Query query=this.sessionFactory.getCurrentSession().createQuery(hql);
		if(params!=null && params.length>0){
			for(int i=0;i<params.length;i++)
				query.setParameter(i, params[i]);
		}
		return (T)query.uniqueResult();
	}
	/**
	 * 
	 * @desc 查询全部数据
	 * @author wangwei
	 * @createDate 2014年9月5日
	 * @return
	 * @throws Exception
	 */
    public List<T> findAll() throws Exception {
		Query query=this.sessionFactory.getCurrentSession().createQuery("from "+entityClass.getSimpleName());
		return query.list();
	}
	
    /**
     * 
     * @desc 按条件查询数据
     * @author wangwei
     * @createDate 2014年9月5日
     * @param hql
     * @param params
     * @return
     * @throws Exception
     */
    public List<T> findByProperty(String hql, Object[] params) throws Exception {
		Query query=this.sessionFactory.getCurrentSession().createQuery(hql);
		if(params!=null && params.length>0){
			for(int i=0;i<params.length;i++)
				query.setParameter(i, params[i]);
		}
		return query.list();
	}
    /**
     * 
     * @desc 按条件更新数据
     * @author zhangtianrun
     * @createDate 2018年4月11日
     * @param hql
     * @param params
     * @return
     * @throws Exception
     */
    public void updateByProperty(String hql, Object[] params)throws Exception {
    	Query query=this.sessionFactory.getCurrentSession().createQuery(hql);
		if(params!=null && params.length>0){
			for(int i=0;i<params.length;i++)
				query.setParameter(i, params[i]);
		}
		query.executeUpdate();
    }
	
    /**
     * 
     * @desc 统计全部数据数量
     * @author wangwei
     * @createDate 2014年9月5日
     * @return
     * @throws Exception
     */
    public Long findCount() throws Exception {
		Query query=this.sessionFactory.getCurrentSession().createQuery("select count(*)"+"from "+entityClass.getSimpleName());
		return (Long)query.uniqueResult();
	}
	
    /**
     * 
     * @desc 分页查询全部数据
     * @author wangwei
     * @createDate 2014年9月5日
     * @param pageNum
     * @param pageSize
     * @return
     * @throws Exception
     */
    public List<T> find4Page(int pageNum, int pageSize) throws Exception {
		Query query=this.sessionFactory.getCurrentSession().createQuery("from "+entityClass.getSimpleName());
		query.setFirstResult((pageNum-1)*pageSize);
		query.setMaxResults(pageSize);
		return query.list();
	}
	
    /**
     * 
     * @desc 按条件查询数据数量
     * @author wangwei
     * @createDate 2014年9月5日
     * @param hql
     * @param params
     * @return
     * @throws Exception
     */
    public Long findCount4PageByProperty(String hql, Object[] params) throws Exception {
		Query query=this.sessionFactory.getCurrentSession().createQuery(hql);
		if(params!=null && params.length>0){
			for(int i=0;i<params.length;i++)
				query.setParameter(i, params[i]);
		}
		return (Long)query.uniqueResult();
	}
	
    /**
     * 
     * @desc 按条件分页查询数据
     * @author wangwei
     * @createDate 2014年9月5日
     * @param pageNum
     * @param pageSize
     * @param hql
     * @param params
     * @return
     * @throws Exception
     */
    public List<T> find4PageByProperty(int pageNum, int pageSize, String hql, Object[] params) throws Exception {
		Query query=this.sessionFactory.getCurrentSession().createQuery(hql);
		if(params!=null && params.length>0){
			for(int i=0;i<params.length;i++)
				query.setParameter(i, params[i]);
		}
		query.setFirstResult((pageNum-1)*pageSize);
		query.setMaxResults(pageSize);
		return query.list();
	}
    
//    public Page<T> findPageByProperty(int pageNumber, int pageSize, String hql, Object[] params) throws Exception {
//        long total = findCount4PageByProperty("select count(*) " + hql, params);
//        List<T> rows = find4PageByProperty(pageNumber, pageSize, hql, params);
//
//        Page<T> page = new Page<T>(pageNumber,pageSize);
//        page.setTotalCount((int)total);
//        page.setList(rows);
//
//        return page;
//    }

    //**************SQL***************************
    /**
     * 通过原生SQL进行新增，修改，删除
     * @param sql
     * @return
     */
    public int excuteBySql(String sql,Object[] params) throws Exception {
        int result ;
        SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
        if(params!=null && params.length>0){
			for(int i=0;i<params.length;i++)
				query.setParameter(i, params[i]);
		}
        result = query.executeUpdate();
        return result;
    }
    /**
     * 通过原生SQL进行查询
     * 返回单个结果集，以Map<String, Object>形式存放。
     * @param sql
     * @return
     */
    public Map<String, Object> findOneBySql(String sql,Object[] params) throws Exception {
        SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
        query.setResultTransformer(CriteriaSpecification.ALIAS_TO_ENTITY_MAP);
        if(params!=null && params.length>0){
			for(int i=0;i<params.length;i++)
				query.setParameter(i, params[i]);
		}
        Map<String, Object> result = (Map<String, Object>)query.uniqueResult();
        return result;
    }

    /**
     * 通过原生SQL进行查询
     * 返回多个结果集，以List<Map<String, Object>>形式存放
     * @param sql
     * @return
     */
    public List<Map<String, Object>> findBySql(String sql,Object[] params) throws Exception {
        SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
        query.setResultTransformer(CriteriaSpecification.ALIAS_TO_ENTITY_MAP);
        if(params!=null && params.length>0){
			for(int i=0;i<params.length;i++)
				query.setParameter(i, params[i]);
		}
        List<Map<String, Object>> list = query.list();
        return list;
    }
    @SuppressWarnings("rawtypes")
	public List<Map<String, Object>> findBySql2(String sql, Map params) throws Exception {
        SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
        query.setResultTransformer(CriteriaSpecification.ALIAS_TO_ENTITY_MAP);
        Iterator<String> keys = params.keySet().iterator();
        while (keys.hasNext()) {
            String key = keys.next();
            Object value = params.get(key);
            if (value instanceof Collection)
                query.setParameterList(key, (Collection)value);
            else
                query.setParameter(key, value);
        }
        List<Map<String, Object>> list = query.list();
        return list;
    }
    /**
     * 
     * @desc 分页原生SQL进行统计数量
     * @author wangwei
     * @createDate 2014年10月13日
     * @param sql
     * @param params
     * @return
     * @throws Exception
     */
    public Long findCount4PageBySql(String sql,Object[] params) throws Exception {
    	SQLQuery query=this.sessionFactory.getCurrentSession().createSQLQuery(sql);
		if(params!=null && params.length>0){
			for(int i=0;i<params.length;i++)
				query.setParameter(i, params[i]);
		}
		return Long.parseLong(query.uniqueResult().toString());
    }
    @SuppressWarnings("rawtypes")
	public Long findCount4PageBySql2(String sql, Map params) throws Exception {
        SQLQuery query = this.sessionFactory.getCurrentSession().createSQLQuery(sql);
        Iterator<String> keys = params.keySet().iterator();
        while (keys.hasNext()) {
            String key = keys.next();
            Object value = params.get(key);
            if (value instanceof Collection)
                query.setParameterList(key, (Collection)value);
            else
                query.setParameter(key, value);
        }
        return Long.parseLong(query.uniqueResult().toString());
    }
    /**
     * 
     * @desc 分页原生SQL进行查询
     * @author wangwei
     * @createDate 2014年9月5日
     * @param sql
     * @param params
     * @param pageNum
     * @param pageSize
     * @return
     * @throws Exception
     */
    public List<Map<String, Object>> find4PageBySql(String sql,Object[] params,int pageNum,int pageSize) throws Exception {
        SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
        query.setResultTransformer(CriteriaSpecification.ALIAS_TO_ENTITY_MAP);
        if(params!=null && params.length>0){
			for(int i=0;i<params.length;i++)
				query.setParameter(i, params[i]);
		}
        query.setFirstResult((pageNum-1)*pageSize);
		query.setMaxResults(pageSize);
        List<Map<String, Object>> list = query.list();
        return list;
    }
  
	@SuppressWarnings("rawtypes")
	public List<Map<String, Object>> find4PageBySql2(String sql, Map params, int pageNum, int pageSize) throws Exception {
        SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
        query.setResultTransformer(CriteriaSpecification.ALIAS_TO_ENTITY_MAP);
        Iterator<String> keys = params.keySet().iterator();
        while (keys.hasNext()) {
            String key = keys.next();
            Object value = params.get(key);
            if (value instanceof Collection)
                query.setParameterList(key, (Collection)value);
            else
                query.setParameter(key, value);
        }
        query.setFirstResult((pageNum-1)*pageSize);
        query.setMaxResults(pageSize);
        List<Map<String, Object>> list = query.list();
        return list;
    }


}
