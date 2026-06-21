package com.ecotrack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecotrack.entity.Activity;

@Repository
public interface ActivityRepository
extends JpaRepository<Activity, Long> {

}
