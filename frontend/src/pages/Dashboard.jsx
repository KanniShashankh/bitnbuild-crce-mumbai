
import { Box, Center, Container, Divider, HStack, Spinner, Text, VStack, useColorMode } from '@chakra-ui/react'
import { CiCircleCheck } from "react-icons/ci";
import React, { useState } from 'react'



import { ArcElement, Chart, Legend, Title, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.tooltip.backgroundColor = 'rgb(0, 0, 156)';
Chart.defaults.plugins.legend.position = 'right';
Chart.defaults.plugins.legend.title.display = true;
Chart.defaults.plugins.legend.title.text = '60 of 100 Done';
Chart.defaults.plugins.legend.title.font = 'Helvetica Neue';

const data = {
    labels: [
        'All',
        'Active',
    ],
    datasets: [{
        data: [60, 40],
        backgroundColor: [
            '#4ecaaf',
            '#efefef'
        ],
        borderWidth: 0,
        radius: '60%'
    }]
};

const Dashboard = () => {
    const salesActivity = [
        {
            quant: 51,
            status: 'To be packed'
        },
        {
            quant: 40,
            status: 'To be shipped'
        },
        {
            quant: 59,
            status: 'To be delivered'
        },
        {
            quant: 91,
            status: 'To be invoiced'
        },
    ];


    const [loading, setLoading] = useState(false)
    const productDetails = [
        {
            quant: 22,
            status: 'Low Stock Items'
        },
        {
            quant: 34,
            status: 'All Item Groups'
        },
        {
            quant: 120,
            status: 'All Items'
        },
        {
            quant: 91,
            status: 'To be invoiced'
        },
    ];
    
        const { colorMode } = useColorMode();
    const bgColor = { light: 'white', dark: 'gray.800' };
    const borderColor = { light: '#ebeaf2', dark: '#2d3748' };
    const textColor = { light: '#777777', dark: 'white' };
    const headerColor = { light: '#777777', dark: 'black' };
    return (

        <>

            {
                loading ? (<Center h={'80vh'} >
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />

                </Center>) :
                    (
                        <Container p={5} maxW={'100vw'} width={'100%'} height={'100vh'}>
                            <Text align={'center'} fontFamily={'myfont'} fontSize='4xl' fontWeight={'bold'} mb={4} color={textColor[colorMode]}  >Dashboard</Text>
                            <VStack w={'100%'} p={2} spacing={10} alignItems="stretch">
                                <HStack spacing={10} justifyContent={'center'} >
                                    <Box
                                        w={'40%'}
                                        onClick={() => navigate('/sales')}
                                        borderRadius="xl"
                                        _hover={{ width:'55%', backgroundColor: colorMode === 'light' ? 'white' : '#0b6285', boxShadow: 'x1', cursor: 'pointer', transform: 'scale(1.2)', transition: 'all 1.1s' }}
                                        boxShadow="md"
                                        sx={{ transition: 'all 0.3s' }}
                                        backgroundColor={bgColor[colorMode]}
                                        border={`1px solid ${borderColor[colorMode]}`}
                                    >
                                        <VStack w={'100%'} spacing={4}  >
                                            <Text
                                                p={2}
                                                backgroundColor={'#f9f9fb'}
                                                w={'100%'}
                                                color={headerColor[colorMode]}
                                                fontSize={'xl'}
                                                textAlign={'start'}
                                                borderTopRadius="xl"
                                                border="1px solid #ebeaf2"
                                                fontFamily={'myfont'}
                                            >
                                                Sales Activity
                                            </Text>

                                            <HStack w={'100%'} spacing={10} px={7} py={4} justifyContent={'space-between'}  >
                                                {salesActivity.map((item, index) => (
                                                    <VStack key={index} align="center" spacing={5} >
                                                        <VStack spacing={0}>
                                                            <Text color={textColor[colorMode]} fontWeight={'bold'} fontSize={'3xl'} >{item.quant}</Text>
                                                            <Text fontWeight={'bold'} fontSize={'0.7rem'} color={'#8d99ae'}>
                                                                Pkgs
                                                            </Text>
                                                        </VStack>
                                                        <HStack spacing={'5px'} ><CiCircleCheck />

                                                            <Text color={textColor[colorMode]} >{item.status.toUpperCase()}</Text></HStack>
                                                    </VStack>
                                                ))}

                                            </HStack>
                                        </VStack>
                                    </Box>


                                    <Box w={'30%'}
                                        borderRadius="xl"
                                        boxShadow="md"
                                        onClick={() => { navigate('/inventory') }}

                                        _hover={{ backgroundColor: colorMode === 'light' ? 'white' : '#0b6285', boxShadow: 'x1', cursor: 'pointer', transform: 'scale(1.2)', transition: 'all 1.1s' }}

                                        sx={{ transition: 'all 0.3s' }}
                                        backgroundColor={bgColor[colorMode]}
                                        border={`1px solid ${borderColor[colorMode]}`} >


                                        <Text
                                            p={2}
                                            backgroundColor={'#f9f9fb'}
                                            w={'100%'}
                                            color={headerColor[colorMode]}
                                            fontSize={'xl'}
                                            textAlign={'start'}
                                            borderTopRadius="xl"
                                            border="1px solid #ebeaf2"
                                            fontFamily={'myfont'}

                                        >
                                            Inventory Summary
                                        </Text>

                                        <VStack w={'100%'} px={7} py={5} spacing={5} >
                                            <HStack w={'100%'} justifyContent={'space-between'} >
                                                <Text color={textColor[colorMode]} fontSize={'0.9rem'} fontWeight={'500'}  >QUANTITY IN HAND</Text>
                                                <Text fontSize={'2xl'} >11234</Text>
                                            </HStack>

                                            <Divider fontWeight={'bold'} />

                                            <HStack w={'100%'} justifyContent={'space-between'} >
                                                <Text fontSize={'0.9rem'} fontWeight={'500'} color={textColor[colorMode]} >QUANTITY TO BE RECEIVED</Text>
                                                <Text fontSize={'2xl'} >62</Text>
                                            </HStack>
                                        </VStack>

                                    </Box>
                                </HStack>

                                <HStack spacing={'90px'} justifyContent={'center'}  >
                                    <Box
                                        w={'52%'}
                                        borderRadius="l"
                                        boxShadow="md"
                                        _hover={{ width:'60%', backgroundColor: colorMode === 'light' ? 'white' : '#0b6285', boxShadow: 'xl', cursor: 'pointer', transform: 'scale(1.1)', transition: 'all 1.1s' }}
                                        sx={{ transition: 'all 0.3s' }}
                                        backgroundColor={bgColor[colorMode]}
                                        border={`1px solid ${borderColor[colorMode]}`}
                                    >
                                        <VStack w={'100%'} spacing={4}  >
                                            <Text
                                                p={2}
                                                backgroundColor={'#f9f9fb'}
                                                w={'100%'}
                                                color={headerColor[colorMode]}
                                                fontSize={'xl'}
                                                textAlign={'start'}
                                                borderTopRadius="xl"
                                                border="1px solid #ebeaf2"
                                                fontFamily={'myfont'}
                                            >
                                                Product Details
                                            </Text>

                                            <HStack w={'100%'} >
                                                <VStack w={'100%'} px={7} justifyContent={'space-between'}  >
                                                    {productDetails.map((item, index) => (

                                                        <HStack w={'100%'} justifyContent={'space-between'} key={index} >
                                                            <Text color={textColor[colorMode]} fontSize={'xl'} >{item.status}</Text>
                                                            <p>11111</p>
                                                        </HStack>


                                                    ))}
                                                </VStack>
                                                <Divider orientation='vertical' height={'150px'} />
                                                <VStack w={'100%'} justifyContent={'space-between'}  >
                                                    <Doughnut data={data} />
                                                </VStack>
                                            </HStack>
                                        </VStack>
                                    </Box>

                                    <Box
                                        borderRadius="xl"
                                        boxShadow="md"
                                        _hover={{ backgroundColor: colorMode === 'light' ? 'white' : '#0b6285', boxShadow: 'xl', cursor: 'pointer', transform: 'scale(1.2)', transition: 'all 1.1s' }}
                                        sx={{ transition: 'all 0.3s' }}
                                        backgroundColor={bgColor[colorMode]}
                                        onClick={() => { navigate('/vendors') }}
                                        border={`1px solid ${borderColor[colorMode]}`} >
                                        <Text
                                            p={2}
                                            backgroundColor={'#f9f9fb'}
                                            w={'100%'}
                                            color={headerColor[colorMode]}
                                            fontSize={'xl'}
                                            textAlign={'start'}
                                            borderTopRadius="xl"
                                            border="1px solid #ebeaf2"
                                            fontFamily={'myfont'}
                                        >
                                            Vendor Summary
                                        </Text>

                                        <VStack w={'100%'} px={7} py={5} spacing={5} >
                                            <HStack w={'100%'} justifyContent={'space-between'} >
                                                <Text color={textColor[colorMode]} fontSize={'0.9rem'} fontWeight={'500'}  >QUANTITY IN HAND</Text>
                                                <Text fontSize={'2xl'} >11234</Text>
                                            </HStack>
                                            <Divider fontWeight={'bold'} />
                                            <HStack w={'100%'} justifyContent={'space-between'} >
                                                <Text fontSize={'0.9rem'} fontWeight={'500'} color={textColor[colorMode]} >QUANTITY TO BE RECEIVED</Text>
                                                <Text fontSize={'2xl'} >62</Text>
                                            </HStack>
                                        </VStack>
                                    </Box>
                                </HStack>
                            </VStack>
                        </Container>
                    )
            }
        </>


    );
}

export default Dashboard;
