"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { _useRouter } from 'next/router';

import Profile from "../../../components/Profile";

const Userprofile = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: session } = useSession();
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
        
            setMyPosts(data);
        };

        console.log(id)
    
        if (session?.user.id) fetchPosts();
        }, [session?.user.id]);
    
        const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    return (
        <Profile
        name={id}
        desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
        data={myPosts}
        />
    )
}

export default Userprofile
