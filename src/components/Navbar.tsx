import Link from 'next/link';

export default async function Navbar() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const response = await fetch(`${API_URL}/api/topics`);
  const data = await response.json();

  return (
    <ol className='mb-3 outline-gray-800 outline max-w-64'>
      {data.map((item: { id: string; title: string }) => (
        <li key={item.id}>
          <Link href={`/read/${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </ol>
  );
}
