package com.student.hbnu.domain.Entity;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import org.hibernate.annotations.GenericGenerator;


@MappedSuperclass
public class BaseEntity  {

	@Id
	@GeneratedValue(generator="increment_generator")
	@GenericGenerator(name="increment_generator", strategy="increment")
    protected int id;
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	 
    @Column(updatable = false)
    private Date createTime;
    private Date updateTime;
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	@PrePersist
    protected void onCreate() {
        createTime = new Date();
    }
 
    @PreUpdate
    protected void onUpdate() {
        updateTime = new Date();
    }
}