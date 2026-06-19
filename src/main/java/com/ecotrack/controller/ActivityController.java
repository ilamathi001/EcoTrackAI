package com.ecotrack.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecotrack.entity.Activity;
import com.ecotrack.service.ActivityService;

@RestController
@RequestMapping("/api/activity")
@CrossOrigin("*")
public class ActivityController {

    @Autowired
    private ActivityService service;

    @PostMapping
    public Activity saveActivity(@RequestBody Activity activity) {

        return service.saveActivity(activity);
    }
}