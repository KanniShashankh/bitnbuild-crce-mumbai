import React, { useEffect, useState } from 'react';
import { Box, Button, Center, HStack, Input, Text, Textarea, VStack, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { FaFileUpload } from 'react-icons/fa';
import { Spinner } from '@chakra-ui/react';
import { SiOpenai } from "react-icons/si";
import ReactMarkdown from 'react-markdown'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

const FileUploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showButton, setShowButton] = useState(false)
    const [resp, setResp] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // State to store input value

    useEffect(() => {
        if(resp != ""){
            setShowButton(true)
            // localStorage.set('company', resp)
        }
    },[resp])

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:5000/upload',
                data: formData
            };

            setLoading(true); // Set loading state to true

            axios.request(config)
                .then((response) => {
                    console.log(response.data);
                    setResp(response.data)
                    setShowButton((prev) => !prev)
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false); // Set loading state to false
                });
        }
        else {
            alert('No file selected');
        }
    };

    const searchValue = (value) =>{
        setSearchTerm(value)
    }

    // Function to handle API request with input value
    const handleSearch = async (value) => {
        const prompt = resp + ' The above is the information, you can use it to answer the below question. ' + value;
        const { data } = await axios.post('http://localhost:5000/query', { text : prompt });
        console.log(data)
        return data;
    };

    

    return (
        <>
            {
                loading ? (
                    <Center h={'80vh'} >
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Center>
                ) : (
                    <Center h="100vh">
                        <VStack>
                            <VStack spacing={10} p={10} borderWidth="1px" borderRadius="lg" boxShadow="lg">
                                <Text fontSize="2xl" fontFamily={'myfont'} fontWeight="bold">Document Summarizer</Text>
                                <Box w="100%" borderStyle="dashed" borderWidth="2px" borderRadius="lg" p={4} borderColor="white" cursor="pointer">
                                    <label htmlFor="file-upload" className="custom-file-upload">
                                        <input id="file-upload" type="file" onChange={handleFileChange} hidden />
                                        {selectedFile ? (
                                            <Text>{selectedFile.name}</Text>
                                        ) : (
                                            <Box display="flex" flexDirection="column" alignItems="center">
                                                <FaFileUpload size={60} />
                                                <Text>Click to Upload File</Text>
                                            </Box>
                                        )}
                                    </label>
                                </Box>
                                <Button colorScheme="blue" onClick={handleUpload}>Upload</Button>
                            </VStack>
                            <Box w={'100%'} maxWidth={'100%'}>
                                <ReactMarkdown>{resp}</ReactMarkdown>
                            </Box>
                            {showButton && (
                                <HStack padding={3} w={'fit-content'} css={{
                                    border: '1px solid teal',
                                }} onClick={onOpen} _hover={{ bg: "teal.600" }} px={3.5} py={2} borderRadius={4} cursor={'pointer'} >
                                    <Box>Chat</Box>
                                    <SiOpenai />
                                </HStack>
                            )}
                        </VStack>
                        <ChatModal isOpen={isOpen} onClose={onClose} handleSearch={handleSearch} />
                    </Center>
                )
            }
        </>
    );
};

export default FileUploadPage;

const ChatModal = ({ isOpen, onClose, handleSearch, onClick }) => {
    const [inputValue, setInputValue] = useState(""); // State to store input value

    const handleChange = (event) => {
        setInputValue(event.target.value); // Update input value state
    };
    const [resState, setResState] = useState('')


    const handleSubmit = async () => {
        setResState('...')
        const data = await handleSearch(inputValue); // Call parent function with input value
        setResState(data);
        // Close the modal
    };

    return (
        <Box w={'1000px'} pos={'absolute'} >
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent maxW="60vw"> {/* Adjusted modal width */}
                    <ModalHeader>Ask About Anything</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack w={'100%'} spacing={8}  >
                            <HStack w={'100%'} >
                                <Input variant='filled' placeholder='Search for anything ' value={inputValue} onChange={handleChange} />
                                <SiOpenai />
                            </HStack>
                            <Textarea value={resState}  readOnly placeholder='Here your responses will be received' />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Ask
                        </Button>
                        {/* <Button onClick={() => } variant='ghost'>Close</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};
