import React from 'react';
import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import img from '../assets/image.png';

const Home = () => {
    return (
        <HStack spacing={8} alignItems="center" height={'80vh'} justifyContent={'center'}>
            <VStack>
                <Text fontSize="4xl" fontFamily={'myfont'} fontWeight="bold" textAlign="center">Inventory Management System</Text>
                <Text fontSize="lg" fontFamily={'myfont'} color="gray.600" textAlign="center">Efficiently organize, track, and manage your inventory</Text>
            </VStack>
            <Image p={4} src={img} width={650} />
        </HStack>
    );
};

export default Home;
