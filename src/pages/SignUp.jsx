import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to the recipe builder or home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      <VStack spacing={4}>
        <Text fontSize="2xl">Sign Up</Text>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Text color="red.500">{error}</Text>}
        <Button onClick={handleSignUp}>Sign Up</Button>
      </VStack>
    </Box>
  );
};

export default SignUp;