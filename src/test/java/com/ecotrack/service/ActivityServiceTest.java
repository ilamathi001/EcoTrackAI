package com.ecotrack.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class ActivityServiceTest {


@Test
void shouldCalculateValidScore() {

    double totalEmission = 200;

    int score =
            (int) Math.max(
                    0,
                    100 - (totalEmission / 10));

    assertEquals(80, score);
}

@Test
void shouldNeverReturnNegativeScore() {

    double totalEmission = 2000;

    int score =
            (int) Math.max(
                    0,
                    100 - (totalEmission / 10));

    assertEquals(0, score);
}


}
