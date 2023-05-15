import React, {useEffect, useState} from "react";
import useAuthContext from "../contexts/AuthContext.jsx";
import {Button, FormControl, FormErrorMessage, Heading, Textarea, VStack} from "@chakra-ui/react";
import defaultApi from "../api/defaultApi.js";
import {useNavigate} from "react-router-dom";

export default function () {
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const {fetchToken} = useAuthContext();

    useEffect(function () {
        fetchToken();
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors(null);
            await defaultApi.post('/posts', {text_content: content});
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

            <Button bg="black" colorScheme="blackAlpha" onClick={handleSubmit}>Publish</Button>
        </VStack>
    );
}
