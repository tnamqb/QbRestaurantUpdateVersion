package com.codegym.restaurant.repository;

import com.codegym.restaurant.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.crypto.Data;
import java.sql.Date;

@Repository
public interface IBillRepository extends JpaRepository<Bill, Long> {
	
	int countByBillTime(Date date);
	
	Iterable<Bill> findByBillTime(Date date);
	
}
