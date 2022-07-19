package com.store.store.Model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "sales")
public class Sales {

    @Getter @Setter @Column(name = "id")
    @Id
    private long id;

    @Getter @Setter @Column(name = "id_sale")
    private long saleId;

    @Getter @Setter @Column(name = "id_product")
    private long name_product;

    @Getter @Setter @Column(name = "total_price")
    private Double total_price;

    @Getter @Setter @Column(name = "purchase_date")
    private Date purchase_date;

    @Getter @Setter @Column(name = "employee_id")
    private long employee_id;
}
