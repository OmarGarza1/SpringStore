package com.store.store.Dao;

import java.util.List;

public interface InventoryDao {

    List getInventory();

    void disableItem(Long id);

    void enableItem(Long id);

    void requestMoreInventory(Long id);


}
