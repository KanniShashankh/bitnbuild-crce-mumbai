import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Input,
    Stack,
    Text,
    Box,
    HStack
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import { MdOutlineInventory2 } from "react-icons/md";

function DrawerExample() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const sidebarElements = ['Home', 'Inventory', 'Sales']
    const sidebarElements1 = [{ component: 'Home', path: '/' }, { component: 'Inventory', path: '/inventory' }, { component: 'Sales', path: '/sales' }, { component: 'Vendors', path: '/vendors' }, { component: 'Dashboard', path: '/dashboard' }, { component: 'Document Summarizer', path: '/fileupload' }]

    return (
        <>
            <Box padding={4}  >
                <MdMenu className='hover:bg-gray-700 rounded-xl fixed'  size={30} ref={btnRef} cursor={'pointer'} colorscheme='teal' onClick={onOpen} />
            </Box>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <HStack><MdOutlineInventory2 /> <Text>Inventory</Text>
                        </HStack>
                    </DrawerHeader>
                    <DrawerBody>
                        <Stack>
                            {
                                sidebarElements1.map((ele, index) => (
                                    <Link to={ele.path} key={index}>
                                        <Button onClick={()=>onClose()} colorscheme='teal' variant='ghost'>
                                            {ele.component}
                                        </Button>
                                    </Link>
                                ))
                            }
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default DrawerExample
