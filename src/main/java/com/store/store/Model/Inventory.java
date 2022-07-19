package com.store.store.Model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "inventory")
public class Inventory {

    @Getter @Setter @Column(name = "inventory_Id")
    @Id
    private long inventoryId;

    @Getter @Setter @Column(name = "name")
    private String name;

    @Getter @Setter @Column(name = "unit_price")
    private int unit_price;

    @Getter @Setter @Column(name = "quantity_in_stock")
    private int quantity_in_stock;

    @Getter @Setter @Column(name = "reorder")
    private boolean isReorder;

    @Getter @Setter @Column(name = "reorder_time_days")
    private int reorder_time_days;

    @Getter @Setter @Column(name = "reorder_date")
    private Date reorder_date;

    @Getter @Setter @Column(name = "active")
    private boolean active;



}
