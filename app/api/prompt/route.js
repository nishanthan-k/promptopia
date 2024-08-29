import Prompt from "@models/prompt";
import { connectDB } from "@utils/database"

export const POST = async (req, res) => {
  const { search } = await req.json();

  try {
    await connectDB();

    let query = {}

    if (search) {
      query = {
        '$or': [
          {
            'prompt': new RegExp(search, 'i'),
          },
          {
            'tag': new RegExp(search, 'i'),
          }
        ]
      }
    }

    const prompts = await Prompt.find(query).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch prompts', { status: 500 });
  }
}