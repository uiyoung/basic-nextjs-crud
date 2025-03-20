import Image from 'next/image';

export default function Home() {
  return (
    <>
      <h1 className='text-2xl font-bold m-2'>Welcome</h1>
      Hello, web!
      <Image src='/original_2.png' alt='' width='240' height='100' />
    </>
  );
}
