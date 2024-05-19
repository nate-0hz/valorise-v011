import Nomination from '@/models/nomination';
import { connectToDB } from '@/utils/database';

export const POST = async (request) => {
  let requestBody;
  try {
    requestBody = await request.json()
  } catch (error) {
    return new Response('Invalid JSON in request body.', { status: 400 });
  }

  const {
    recipientUser,
    nominatorFullUser,
    nominatorBasicUser,
    nominationValue,
    nominationBody,
    nominationDate,
    isNominatorFullUser,
    isNominationInstant,
    isApproved,
    isReleased,
    releasedDate
  } = requestBody;

  try {
    await connectToDB();
    const newNomination = new Nomination({
      recipientUser: recipientUser,
      nominatorFullUser: nominatorFullUser,
      nominatorBasicUser: nominatorBasicUser,
      nominationValue: nominationValue,
      nominationBody: nominationBody,
      nominationDate: nominationDate,
      isNominatorFullUser: isNominatorFullUser,
      isNominationInstant: isNominationInstant,
      isApproved: isApproved,
      isReleased: isReleased,
      releasedDate: releasedDate
    });

    await newNomination.save();
    return new Response(JSON.stringify(newNomination), { status: 201 })
  } catch (error) {
    return new Response('Failed to create nomination.', { status: 500 })
  }
}