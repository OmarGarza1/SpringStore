package com.store.store.Dao;


import com.store.store.Model.Inventory;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Repository
@Transactional
public class InventoryDaoImp implements InventoryDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public List getInventory() {
        String query = "FROM Inventory";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void disableItem(Long id) {
        // to Disable item from db
        Inventory inventory = entityManager.find(Inventory.class, id);
        inventory.setActive(false);
        inventory.setReorder(false);
        inventory.setReorder_date(null);
        entityManager.persist(inventory);

        // To delete completely from db
        //entityManager.remove(inventory);
    }

    @Override
    public void enableItem(Long id) {
        Inventory inventory = entityManager.find(Inventory.class, id);
        inventory.setActive(true);
        entityManager.persist(inventory);
    }

    @Override
    public void requestMoreInventory(Long id) {

        Inventory inventory = entityManager.find(Inventory.class, id);

        if(!inventory.isReorder()) {
            Date date = new Date();
            SimpleDateFormat df = new SimpleDateFormat("YYYY-MM-dd");
            Calendar c1 = Calendar.getInstance();
            String currentDate = df.format(date);

            c1.add(Calendar.DAY_OF_YEAR, inventory.getReorder_time_days());
            df = new SimpleDateFormat("yyyy-MM-dd");
            Date resultDate = c1.getTime();

            inventory.setReorder(true);
            inventory.setReorder_date(resultDate);
        }else{
            inventory.setReorder(false);
            inventory.setReorder_date(null);
        }

        entityManager.persist(inventory);
    }

}
