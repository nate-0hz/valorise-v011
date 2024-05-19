import Comment from '@/models/comment';
import { connectToDB } from '@/utils/database';

export const POST = async (request) => {
  let commentRequestBody;
  try {
    commentRequestBody = await request.json()
  } catch (error) {
    return new Response('Invalid JSON in request body.', { status: 400 });
  }

  const {
  nominationId,
  commenterId,
  commentBody,
  commentDate
  } = commentRequestBody;

  try {
    await connectToDB();
    const newComment = new Comment({
      nominationId: nominationId,
      commenterId: commenterId,
      commentBody: commentBody,
      commentDate: commentDate
    });

    await newComment.save();
    return new Response(JSON.stringify(newComment), { status: 201 })
  } catch (error) {
    return new Response('Failed to create comment.', { status: 500 })
  }
}