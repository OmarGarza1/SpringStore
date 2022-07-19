package com.store.store.Controller;

import com.store.store.Dao.InventoryDao;
import com.store.store.Dao.SalesDao;
import com.store.store.Model.Inventory;
import com.store.store.Model.Sales;
import com.store.store.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SalesController {

    @Autowired
    private SalesDao salesDao;

    @Autowired
    private InventoryDao inventoryDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value ="api/sales",  method = RequestMethod.GET)
    public List<Sales> getSales(@RequestHeader(value = "Authorization") String token ){

        if(!validateToken(token)){
            return null;
        }
        return salesDao.getSales();
    }

    private boolean validateToken(String token){
        String userId = jwtUtil.getKey(token);
        return userId != null;
    }

}
