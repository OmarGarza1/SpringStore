package com.store.store.Model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "users")
public class User {

    @Getter @Setter @Column(name = "id")
    @Id
    private long userId;

    @Getter @Setter @Column(name = "name")
    private String name;

    @Getter @Setter @Column(name = "email")
    private String email;

    @Getter @Setter @Column(name = "phone")
    private String phoneNumber;

    @Getter @Setter @Column(name = "password")
    private String password;

    @Getter @Setter @Column(name = "position")
    private String position;

    @Getter @Setter @Column(name = "start_date")
    private Date startDate;

    @Getter @Setter @Column(name = "end_date")
    private Date endDate;

    @Getter @Setter @Column(name = "active")
    private boolean isUserActive;

}
