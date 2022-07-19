package com.store.store.Dao;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class SalesDaoImp implements  SalesDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public List getSales() {
        String query = "FROM Sales";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void createSale() {

    }

    @Override
    public void deleteSale() {

    }

}
