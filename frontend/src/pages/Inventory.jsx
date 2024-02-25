import { Container, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import TableComponent from '../components/Table'

const Inventory = () => {

  const [loading, setLoading] = useState(true)
  const timeOutFucntion = () =>{
    setLoading(false)
}
setTimeout(timeOutFucntion, 2000)
  return (

    <Container maxW={'100vw'} width={'100%'} height={'100vh'}  >
        <Text fontSize={'2xl'} textAlign={'center'} fontFamily={'myfont'}>Inventory</Text>
        <TableComponent/>
    </Container>
  )
}

export default Inventory
