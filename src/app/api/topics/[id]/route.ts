import { topics } from '@/data/topics';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const topic = topics.find((item) => item.id === id);
  return Response.json(topic);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { title, content } = await request.json();
  const index = topics.findIndex((item) => item.id === id);
  if (index === -1) {
    return Response.json({ error: 'topic not found' }, { status: 404 });
  }

  topics[index].title = title;
  topics[index].content = content;
  return Response.json(topics);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = topics.findIndex((item) => item.id === id);
  if (index === -1) {
    return Response.json({ error: 'topic not found' }, { status: 404 });
  }

  topics.splice(index, 1);
  return Response.json(topics);
}
