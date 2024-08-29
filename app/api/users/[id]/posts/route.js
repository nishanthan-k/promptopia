import Prompt from "@models/prompt";
import { connectDB } from "@utils/database"

export const GET = async (req, { params }) => {

  try {
    await connectDB();
    const prompts = await Prompt.find({ creator: params.id }).populate('creator').sort({ _id: -1 });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify('Failed to fetch user prompts'), { status: 500 });
  }
}