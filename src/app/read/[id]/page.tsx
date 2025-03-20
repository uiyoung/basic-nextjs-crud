export default async function ReadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${API_URL}/api/topics/${id}`);
  const topic = await response.json();

  return (
    <>
      <h2 className='font-bold'>{topic.title}</h2>
      parameter : {id}
      <div>{topic.content}</div>
    </>
  );
}
