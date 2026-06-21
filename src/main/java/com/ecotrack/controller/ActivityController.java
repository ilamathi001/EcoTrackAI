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

    return service.saveActivity(activity);
}

@GetMapping("/history")
public List<Activity> getHistory() {
    return service.getHistory();
}


}
