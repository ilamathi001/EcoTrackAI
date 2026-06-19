package com.ecotrack.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecotrack.service.GeminiService;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AiController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/recommend")
    public Map<String, String> recommend(
            @RequestBody Map<String, Object> request) {

        String userName = (String) request.get("userName");
        Integer electricityUnits =
                Integer.parseInt(request.get("electricityUnits").toString());
        String vehicleType =
                request.get("vehicleType").toString();
        String foodType =
                request.get("foodType").toString();

        String recommendation =
                geminiService.getRecommendation(
                        userName,
                        electricityUnits,
                        vehicleType,
                        foodType);

        Map<String, String> response = new HashMap<>();
        response.put("recommendation", recommendation);

        return response;
    }
}