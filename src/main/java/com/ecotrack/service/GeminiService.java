package com.ecotrack.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeminiService {


@Value("${gemini.api.key}")
private String apiKey;

private final RestTemplate restTemplate;

public GeminiService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
}

@SuppressWarnings("unchecked")
public String getRecommendation(
        String userName,
        Integer electricityUnits,
        String vehicleType,
        String foodType) {

    String prompt = """
            You are an environmental sustainability expert.

            Analyze this user's carbon footprint.

            User Name: %s
            Electricity Units: %d
            Vehicle Type: %s
            Food Type: %s

            Provide:

            1. Carbon Footprint Summary
            2. Top Emission Sources
            3. Personalized Recommendations
            4. Estimated Carbon Reduction

            Keep response under 200 words.
            """
            .formatted(
                    userName,
                    electricityUnits,
                    vehicleType,
                    foodType);

    String url =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="
                    + apiKey;

    Map<String, Object> requestBody =
            Map.of(
                    "contents",
                    List.of(
                            Map.of(
                                    "parts",
                                    List.of(
                                            Map.of(
                                                    "text",
                                                    prompt)))));

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<Map<String, Object>> entity =
            new HttpEntity<>(requestBody, headers);

    try {

        ResponseEntity<Map<String, Object>> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.POST,
                        entity,
                        new ParameterizedTypeReference<Map<String, Object>>() {
                        });

        Map<String, Object> body = response.getBody();

        if (body == null) {
            return getFallbackRecommendation();
        }

        List<?> candidates =
                (List<?>) body.get("candidates");

        if (candidates == null || candidates.isEmpty()) {
            return getFallbackRecommendation();
        }

        Map<String, Object> firstCandidate =
                (Map<String, Object>) candidates.get(0);

        Map<String, Object> content =
                (Map<String, Object>) firstCandidate.get("content");

        List<?> parts =
                (List<?>) content.get("parts");

        Map<String, Object> firstPart =
                (Map<String, Object>) parts.get(0);

        return firstPart.get("text").toString();

    } catch (Exception e) {

        System.out.println("Gemini Error: " + e.getMessage());

        return getFallbackRecommendation();
    }
}

private String getFallbackRecommendation() {

    return """
            Carbon Footprint Summary

            Your carbon footprint is moderate.

            Top Emission Sources:
            • Electricity consumption
            • Transportation usage

            Personalized Recommendations:
            • Reduce unnecessary electricity usage.
            • Use public transport or carpooling.
            • Prefer energy-efficient appliances.
            • Increase plant-based meals during the week.
            • Track your monthly carbon footprint.

            Estimated Carbon Reduction:
            • 15% - 20% reduction possible.

            (Generated using fallback sustainability guidance.)
            """;
}

}
