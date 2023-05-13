import React, {useEffect, useState} from "react";
import useAuthContext from "../contexts/AuthContext.jsx";
import {Button, FormControl, FormErrorMessage, Heading, Textarea, VStack} from "@chakra-ui/react";
import defaultApi from "../api/defaultApi.js";
import {useNavigate} from "react-router-dom";

export default function () {
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const {user, checkUser} = useAuthContext();

    useEffect(function () {
        checkUser();
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors(null);
            await defaultApi.get('/sanctum/csrf-cookie');
            await defaultApi.post('/api/posts', {text_content: content}, {
                withCredentials: true,
            });
            navigate('/');
        } catch (e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    };

    return (
        <VStack p={4} flex={1} w="full" align="start">
            <Heading size="md">Create new post</Heading>

            <FormControl isInvalid={errors != null}>
                <Textarea maxW={400} rows={4} placeholder="Type your post here..."
                          onChange={e => setContent(e.target.value)}></Textarea>
                <FormErrorMessage>{errors?.text_content?.join(',')}</FormErrorMessage>
            </FormControl>

            <Button colorScheme="teal" onClick={handleSubmit}>Publish</Button>
        </VStack>
    );
}
