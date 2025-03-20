'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UpdatePage() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${API_URL}/api/topics/${id}`);
        if (!response.ok) {
          throw new Error('get topic failed');
        }

        const data = await response.json();
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/topics/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('update topic failed');
      }

      router.push(`/read/${id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Failed to update topic');
    }
  };

  return (
    <>
      <h3 className='scroll-m-20 text-xl font-semibold tracking-tight mb-2'>
        update topic
      </h3>
      <div className='flex flex-col gap-2 max-w-lg mb-2'>
        <Input
          type='text'
          placeholder='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <Button onClick={handleSubmit}>submit</Button>
    </>
  );
}
