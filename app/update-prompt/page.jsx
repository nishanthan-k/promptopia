"use client";
import Form from '@components/Form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const EditPromptComponent = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  useEffect(() => {
    const getPrompts = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();

      if (res.ok) {
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      }
    };

    if (promptId) {
      getPrompts();
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
        }),
      });

      if (response.ok) {
        router.back();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
};

const EditPrompt = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EditPromptComponent />
  </Suspense>
);

export default EditPrompt;
