"use client";
import Form from '@components/Form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  useEffect(() => {
    const getPrompt = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();

      if (res.ok) {
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        })
      }
    }

    if (promptId) {
      getPrompt();
    }
  }, [promptId]);

  const editPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      })

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  )
}

export default EditPrompt;
