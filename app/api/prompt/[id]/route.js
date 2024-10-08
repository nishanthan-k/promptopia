import Prompt from "@models/prompt";
import { connectDB } from "@utils/database"

export const GET = async (req, { params }) => {

  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) {
      return new Response(JSON.stringify('Prompt not found'), { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify('Failed to fetch user prompts'), { status: 500 });
  }
}

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response(JSON.stringify('Prompt not found'), { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response('Prompt updated successfully', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to update prompt', { status: 500 });
  }
}

export const DELETE = async (req, { params }) => {
  
  try {
    await connectDB();

    const existingPrompt = await Prompt.findByIdAndDelete(params.id);

    return new Response('Prompt deleted successfully', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to delete prompt', { status: 500 });
  }
}