import { topics } from '@/data/topics';

export async function GET() {
  return Response.json(topics);
}

export async function POST(request: Request) {
  const { title, content } = await request.json();

  const id = String(topics.length + 1);
  topics.push({
    id,
    title,
    content,
  });

  return Response.json({ success: true, id });
}
