'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/topics`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      }
    );
    const data = await response.json();
    if (data.success) {
      router.push(`/read/${data.id}`);
      router.refresh();
    }
  };

  return (
    <>
      <h3 className='scroll-m-20 text-xl font-semibold tracking-tight mb-2'>
        create a new topic
      </h3>
      <div className='flex flex-col gap-2 max-w-lg'>
        <Input
          type='text'
          placeholder='title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder='content'
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <Button onClick={handleSubmit}>submit</Button>
    </>
  );
}
