'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function Control() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const deleteTopic = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      const response = await fetch(`${API_URL}/api/topics/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('delete topic error');
      }
      const data = await response.json();
      console.log('🚀 ~ deleteTopic ~ data:', data);

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul className='m-2'>
      <li>
        <Link href='/create'>create</Link>
      </li>
      {id && (
        <>
          <li>
            <Link href={`/update/${id}`}>update</Link>
          </li>
          <li>
            <button onClick={deleteTopic}>delete</button>
          </li>
        </>
      )}
    </ul>
  );
}
