package com.ecotrack.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecotrack.service.GeminiService;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {


@Autowired
private GeminiService geminiService;

@PostMapping("/recommend")
public Map<String, String> recommend(
        @RequestBody Map<String, Object> request) {

    String userName =
            String.valueOf(request.getOrDefault("userName", "User"));

    Integer electricityUnits =
            Integer.parseInt(
                    String.valueOf(
                            request.getOrDefault(
                                    "electricityUnits",
                                    0)));

    String vehicleType =
            String.valueOf(
                    request.getOrDefault(
                            "vehicleType",
                            "CAR"));

    String foodType =
            String.valueOf(
                    request.getOrDefault(
                            "foodType",
                            "NONVEG"));

    String recommendation =
            geminiService.getRecommendation(
                    userName,
                    electricityUnits,
                    vehicleType,
                    foodType);

    Map<String, String> response =
            new HashMap<>();

    response.put(
            "recommendation",
            recommendation);

    return response;
}


}
