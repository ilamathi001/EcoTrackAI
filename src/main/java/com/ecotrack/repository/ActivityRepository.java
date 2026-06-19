package com.ecotrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecotrack.entity.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

}