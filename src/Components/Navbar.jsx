import { Box, Flex, Spacer , Button, Heading} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";



const Navbar = () => {
  return (
    <>
      <Flex p={2} 
        mt={1}
        mb={15}
        color='teal'
        boxShadow='teal' 
        rounded='md' 
        backdropFilter='auto' backdropBlur='6px'
      >
      
        <Box p={2}>
          <Heading size="md">Apartment</Heading>
        </Box>
        <Spacer />
        <Box>
            
            <Link to='/'>
                <Button colorScheme="teal" mr="4" size='md' variant='solid'
                >
                    Home
                </Button>
            </Link>
            <Link to='/signin'>
                <Button colorScheme="teal" size='md' mr="4" variant='solid'>
                    Sign Up
                </Button>
            </Link>
            <Link to='/login'>
                <Button  colorScheme="teal" mr="4" size='md' variant='solid'>Log in</Button>
            </Link>
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
