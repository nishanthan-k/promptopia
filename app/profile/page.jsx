"use client";
import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post?._id}`);
  }

  const handleDelete = async (post) => {
    const isConfirmed = confirm("Are you sure you want to delete this prompt")

    if (isConfirmed) {
      try {
        const res = await fetch(`/api/prompt/${post?._id}`, {
          method: 'DELETE',
        })

        if (res.ok) {
          setPosts((ele) => ele.filter((e) => e._id !== post?._id));
        }

      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    if (session?.user?.id) {
      fetchPosts();
    }
  }, [session]);

  return (
    <Profile
      name="My"
      desc="Welcome to the profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile;
