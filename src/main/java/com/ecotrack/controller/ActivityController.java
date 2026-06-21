package com.ecotrack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecotrack.entity.Activity;
import com.ecotrack.service.ActivityService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/activity")
@CrossOrigin(origins = "*")
public class ActivityController {

    @Autowired
    private ActivityService service;

    @PostMapping
    public Activity saveActivity(
            @Valid @RequestBody Activity activity) {

        System.out.println("========== API HIT ==========");
        System.out.println("User Name : " + activity.getUserName());
        System.out.println("Units : " + activity.getElectricityUnits());
        System.out.println("Distance : " + activity.getDistanceTravelled());
        System.out.println("Vehicle : " + activity.getVehicleType());

        Activity saved = service.saveActivity(activity);

        System.out.println("Score : " + saved.getCarbonScore());

        return saved;
    }

    @GetMapping("/history")
    public List<Activity> getHistory() {

        System.out.println("========== HISTORY HIT ==========");

        return service.getHistory();
    }
}