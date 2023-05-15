import React, {useState} from "react";
import useAuthContext from '../contexts/AuthContext.jsx';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement, Link,
    VStack
} from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {Link as RouterLink} from "react-router-dom";

export default function () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {login, errors} = useAuthContext();

    const handleLogin = async event => {
        event.preventDefault();

        setIsLoading(true);
        await login({email, password});
        setIsLoading(false);
    }

    return (
        <VStack w="full" flex={1} justify="center" align="center">
            <VStack rounded="md" shadow="md" bg="gray.50" spacing={4} px={12} py={4}>
                <Heading size="md" my={4}>Sign in</Heading>
                <FormControl isInvalid={Array.isArray(errors?.email)}>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' placeholder="Enter email address" onChange={e => setEmail(e.target.value)}/>
                    <FormErrorMessage>{errors?.email?.join(',')}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Array.isArray(errors?.password)}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input type={showPassword ? 'text' : 'password'} placeholder='Enter password'
                               onChange={e => setPassword(e.target.value)}/>
                        <InputRightElement width='4.5rem'>
                            <IconButton size='sm' onClick={() => setShowPassword(!showPassword)}
                                        icon={showPassword ? <ViewOffIcon/> : <ViewIcon/>} aria-label="show/hide">
                                {showPassword ? 'Hide' : 'Show'}
                            </IconButton>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors?.password?.join(',')}</FormErrorMessage>
                </FormControl>
                <Button bg="black" colorScheme="blackAlpha" alignSelf="stretch" onClick={handleLogin} isLoading={isLoading}
                        loadingText="Signing in">Sign in</Button>
            </VStack>
            <Link as={RouterLink} to="/register">Create a new account</Link>
        </VStack>
    );
}
