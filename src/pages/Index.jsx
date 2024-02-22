import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Text, List, ListItem, useToast } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

// Helper function to check if a number is prime
const isPrime = (num) => {
  if (num <= 1) return false;
  if (num <= 3) return true;

  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  return true;
};

const Index = () => {
  const [input, setInput] = useState("");
  const [primeNumbers, setPrimeNumbers] = useState([]);
  const toast = useToast();

  const handleInputChange = (event) => setInput(event.target.value);

  const searchPrimes = () => {
    const maxExponent = parseInt(input);
    if (isNaN(maxExponent) || maxExponent < 2) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid integer greater than or equal to 2.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const primes = [];
    for (let p = 2; p <= maxExponent; p++) {
      const number = Math.pow(2, p) - 1;
      if (isPrime(number)) {
        primes.push(number);
      }
    }

    setPrimeNumbers(primes);
  };

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={4} as="form" onSubmit={(e) => e.preventDefault()}>
        <FormControl isRequired>
          <FormLabel htmlFor="exponent">Enter Maximum Exponent</FormLabel>
          <Input id="exponent" type="number" value={input} onChange={handleInputChange} placeholder="Enter a number" />
        </FormControl>
        <Button leftIcon={<FaSearch />} colorScheme="blue" onClick={searchPrimes}>
          Search Prime Numbers
        </Button>
      </VStack>
      <Box mt={10}>
        <Text fontSize="lg" mb={2}>
          Mersenne Primes (2^p - 1):
        </Text>
        <List spacing={3}>
          {primeNumbers.map((prime, index) => (
            <ListItem key={index} borderWidth="1px" p={2} borderRadius="md">
              {prime}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Index;
