import React, {useEffect, useState} from "react";
import useAuthContext from "../contexts/AuthContext.jsx";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Heading,
    HStack,
    Select,
    Text,
    VStack
} from "@chakra-ui/react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import defaultApi from "../api/defaultApi.js";
import {Link} from "react-router-dom";

dayjs.extend(relativeTime);

export default function () {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState('all');
    const {user, fetchToken} = useAuthContext();

    const fetchAllPosts = async () => {
        const {data} = await defaultApi.get(`/posts?filter=${filter}`);
        setPosts(data);
    }

    useEffect(function () {
        fetchToken();
    }, []);

    useEffect(function () {
        fetchAllPosts();
    }, [filter])

    return (
        <VStack flex={1} p={4} w="full" align="start">
            <Heading size="md">Welcome {user?.name}</Heading>
            <Link to="/create-post">
                <Button>Create post</Button>
            </Link>
            <Divider my={8} />
            <HStack>
                <Heading size="md" minW={200}>Explore posts</Heading>
                <Select value={filter} onChange={e => setFilter(e.target.value)}>
                    <option value='all'>All posts</option>
                    <option value='user'>Your posts</option>
                </Select>
            </HStack>
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
