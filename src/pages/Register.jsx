import React, {useEffect, useState} from "react";
import useAuthContext from '../contexts/AuthContext.jsx';
import {Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack} from "@chakra-ui/react";
import {Link} from "react-router-dom";

export default function () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {errors, clearErrors, register} = useAuthContext();

    useEffect(clearErrors, []);
    const handleSubmit = async event => {
        event.preventDefault();

        setIsLoading(true);
        await register({name, email, password, password_confirmation: passConfirm});

        setIsLoading(false);
    }

    return (
        <VStack w="full" flex={1} justify="center" align="center">
            <VStack rounded="md" shadow="md" bg="gray.50" spacing={4} px={12} py={4}>
                <Heading size="md" my={4}>Create a new account</Heading>
                <FormControl isInvalid={Array.isArray(errors?.email)}>
                    <FormLabel>Your name</FormLabel>
                    <Input placeholder="Enter your full name" onChange={e => setName(e.target.value)}/>
                    <FormErrorMessage>{errors?.name?.join(',')}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Array.isArray(errors?.email)}>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' placeholder="Enter email address" onChange={e => setEmail(e.target.value)}/>
                    <FormErrorMessage>{errors?.email?.join(',')}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Array.isArray(errors?.password)}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder='Enter password' onChange={e => setPassword(e.target.value)}/>
                    <FormErrorMessage>{errors?.password?.join(',')}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={password !== passConfirm && passConfirm.length > 0}>
                    <FormLabel>Confirm password</FormLabel>
                    <Input type="password" placeholder='Enter password again to confirm'
                           onChange={e => setPassConfirm(e.target.value)}/>
                    <FormErrorMessage>Password does not match</FormErrorMessage>
                </FormControl>
                <Button bg="black" colorScheme="blackAlpha" alignSelf="stretch" isLoading={isLoading} onClick={handleSubmit}
                        loadingText="Submitting">Register</Button>
            </VStack>
            <Link to="/login">Sign in to an existing account</Link>
        </VStack>
    );
}
