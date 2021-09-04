package com.codegym.restaurant.repository;

import com.codegym.restaurant.model.Statistical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStatisticalRepository extends JpaRepository<Statistical, Long> {

}
