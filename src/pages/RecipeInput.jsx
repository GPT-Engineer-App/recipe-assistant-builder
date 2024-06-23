import React, { useState } from 'react';
import { Container, Input, Button, VStack, Text, Box, Image } from '@chakra-ui/react';
import { ClarifaiStub, grpc } from 'clarifai';

const stub = ClarifaiStub.grpc();

const RecipeInput = () => {
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState(null);
  const [identifiedIngredients, setIdentifiedIngredients] = useState([]);
  const [error, setError] = useState('');

  const handleTextInput = (e) => {
    setIngredients(e.target.value);
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const identifyIngredients = async () => {
    if (!image) {
      setError('Please upload an image.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];

      stub.PostModelOutputs(
        {
          model_id: 'food-item-recognition',
          inputs: [{ data: { image: { base64: base64Image } } }],
        },
        (err, response) => {
          if (err) {
            setError('Error identifying ingredients.');
            return;
          }

          const concepts = response.outputs[0].data.concepts;
          setIdentifiedIngredients(concepts.map((concept) => concept.name));
        }
      );
    };
    reader.readAsDataURL(image);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Input Ingredients</Text>
        <Input placeholder="Enter ingredients" value={ingredients} onChange={handleTextInput} />
        <Text fontSize="xl">Or</Text>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <Image src={URL.createObjectURL(image)} alt="Uploaded ingredient" boxSize="200px" />}
        <Button onClick={identifyIngredients}>Identify Ingredients</Button>
        {error && <Text color="red.500">{error}</Text>}
        {identifiedIngredients.length > 0 && (
          <Box>
            <Text fontSize="xl">Identified Ingredients:</Text>
            <VStack spacing={2}>
              {identifiedIngredients.map((ingredient, index) => (
                <Text key={index}>{ingredient}</Text>
              ))}
            </VStack>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default RecipeInput;