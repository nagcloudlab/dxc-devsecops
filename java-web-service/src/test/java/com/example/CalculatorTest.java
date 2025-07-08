package com.example;

class CalculatorTest {

    final Calculator calculator = new Calculator();

    @org.junit.jupiter.api.Test
    void testAdd() {
        int result = calculator.add(2, 3);
        org.junit.jupiter.api.Assertions.assertEquals(5, result);
    }

    @org.junit.jupiter.api.Test
    void testMultiply() {
        int result = calculator.multiply(4, 5);
        org.junit.jupiter.api.Assertions.assertEquals(20, result);
    }

    @org.junit.jupiter.api.Test
    void testDivide() {
        double result = calculator.divide(10, 2);
        org.junit.jupiter.api.Assertions.assertEquals(5.0, result);
    }

    @org.junit.jupiter.api.Test
    void testDivideByZero() {
        org.junit.jupiter.api.Assertions.assertThrows(IllegalArgumentException.class, () -> {
            calculator.divide(10, 0);
        });
    }
}
