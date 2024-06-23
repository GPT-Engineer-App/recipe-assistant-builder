import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Box, Button, Input, VStack, Text } from "@chakra-ui/react";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the recipe builder or home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box p={4} maxW="md" mx="auto">
      <VStack spacing={4}>
        <Text fontSize="2xl">Log In</Text>
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
        <Button onClick={handleLogIn}>Log In</Button>
      </VStack>
    </Box>
  );
};

export default LogIn;