
  
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {
  FormControl,
  FormLabel,
  Input,
  Container,
  Button,
  Heading,
  useToast
} from '@chakra-ui/react'
const Signin = () => {
  const [signin, setSignin] = useState({});
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://sunday-server.herokuapp.com/user/post", signin).then((res)=> {
      localStorage.setItem('signin', JSON.stringify(res.data.user));
      console.log(res)
      toast({
        title: 'sign in successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      navigate('/login')
    }).catch((err)=> console.log(err));
  }
  const handleChange = (e) => {
    const { id, value} = e.target;
    setSignin({...signin, [id] : value})
  }
  return (
    <>
      <Container mt={30}>
        <Heading align="center" mb={4}>
          Sign up
        </Heading>
        <form action="" onSubmit={(e)=> handleSubmit(e)}>
        <FormControl isRequired >
          <FormLabel htmlFor='firstName'>First Name</FormLabel>
          <Input id='firstName' type='text' onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='lastName'>Last Name</FormLabel>
          <Input id='lastName' type='text'  onChange={handleChange}/>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='email'>Email address</FormLabel>
          <Input id='email' type='email' onChange={handleChange}/>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='password'>Pasword</FormLabel>
          <Input id='password' type='password' placeholder='Enter Password' onChange={handleChange}/>
        </FormControl>
        <Button
            mt={4}
            colorScheme='blue'
            type='submit'
          >
            Sign up
          </Button>
          </form>
      </Container>
    </>
  )
}

export default Signin