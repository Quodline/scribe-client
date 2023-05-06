import React, {useEffect, useState} from "react";
import useAuthContext from "../contexts/AuthContext.jsx";
import {Button, Card, CardBody, CardFooter, CardHeader, Divider, Heading, Text, VStack} from "@chakra-ui/react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import defaultApi from "../api/defaultApi.js";
import {Link} from "react-router-dom";

dayjs.extend(relativeTime);

export default function () {
    const [posts, setPosts] = useState([]);
    const {user, checkUser} = useAuthContext();

    const fetchAllPosts = async () => {
        const {data} = await defaultApi.get('/api/posts');
        setPosts(data);
    }

    useEffect(function () {
        checkUser().then(fetchAllPosts);
    }, []);

    return (
        <VStack flex={1} p={4} w="full" align="start">
            <Heading size="md">Welcome {user?.name}</Heading>
            <Link to="/create-post">
                <Button>Create post</Button>
            </Link>
            <Divider my={8} />
            <Heading size="md">Explore posts</Heading>
            {posts.length ? posts.map((post, i) => (
                <Card key={i} w="full">
                    <CardHeader>
                        <Heading size="sm">{post.user.name}</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>{post.text_content}</Text>
                    </CardBody>
                    <CardFooter>
                        <Text>{dayjs(post.created_at).fromNow()}</Text>
                    </CardFooter>
                </Card>
            )) : (
                <p>No posts yet.</p>
            ) }
        </VStack>
    );
}
