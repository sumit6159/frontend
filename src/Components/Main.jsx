// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import { 
  
  Thead,
  Table,
  VStack,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Spacer,
  TableContainer,
  HStack,
  Input,
  Select,
  useToast,
  Container,
  Spinner, } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
const Main = () => {
  const toast = useToast()

  const [status, setStatus] = useState(false);
  const [data, setData] = useState(
    ()=> JSON.parse(localStorage.getItem('flat')) || []
  );
  useEffect(()=>{
    axios.get('https://sunday-server.herokuapp.com/flat/all').then((res)=>{
      localStorage.setItem('flat', JSON.stringify(res.data.flat))
      setData(res.data.flat)
    })
  }, [])
  const handleChange = (e) =>{
    const {id, value} = e.target
    console.log(id, value)
    axios.get(`https://sunday-server.herokuapp.com/flat/sort?${id}=${value}`).then((res)=>{
    console.log(res.data)  
    localStorage.setItem('flat', JSON.stringify(res.data))
      setData(res.data)
      setStatus(!status)
    })
  }
  const handleBlock = (id)=>{
    let value = id.target.value;
    value = value.toUpperCase();
    if(value.length === 0){
      axios.get('https://sunday-server.herokuapp.com/flat/all').then((res)=>{
      localStorage.setItem('flat', JSON.stringify(res.data.flat))
      setData(res.data.flat)
    })
    }
    axios.get(`https://sunday-server.herokuapp.com/flat/block/${value}`).then((res)=>{
    if(res.data.length<1){
        console.log('hre')
        setStatus(!status)
        toast({
          title: 'Not available.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      } else {
              setData(res.data)
              setStatus(!status)
        }
    }).catch((err)=>{console.log(err)})
    
  }
  useEffect(()=>{},[status])
  if(data.length == 0){
    return <Container w="50%" mt={50} align="center">
      <Spinner size='xl' thickness='5px'
      speed='0.65s'
      emptyColor='red.200'
      color='blue.500'/>
    </Container>
  }
  return (

    <VStack mt={15}>
      
      <HStack  w='38%' m={5}>
        <Box p='1' borderRadius='md' bg='#d9dee9' color='black' >
          <Select placeholder='sort'id='sortby' onChange={handleChange}>
            <option value='asc'>Ascending</option>
            <option value='dsc'>Descending</option>
          </Select>
        </Box>
        <Spacer />
        <Box borderRadius='md' bg='#d9dee9' color='black'>
          <Input p='1' placeholder='Search by Block' onChange={handleBlock} />
        </Box>
      </HStack>
 
      <TableContainer>
        <Table variant='striped' size="lg" colorScheme='whatsapp'>
          <Thead>
            <Tr>
              <Th isNumeric>Flat NO</Th>
              
              <Th>Type</Th>
              <Th isNumeric>Block</Th>
              <Th>Look</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              data && data.map((item, index) =>(
                <Tr key={index} size="md">
                  <Td>{item.flatNo}</Td>
                  
                  <Td>{item.type}</Td>
                  <Td isNumeric>{item.block}</Td>
                  <Td>
                    <Link to={`/flat/${item._id}`} >
                      Look into
                    </Link>
                  </Td>
                </Tr>
              ))
            }
            
          </Tbody>
          
        </Table>
      </TableContainer>
    </VStack>
  )
}

export default Main