import { getJournal } from "@/actions/journal/actions";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, streamText } from "ai";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const res = await getJournal(id);
    if (res.error || !res.data?.content) {
        return new Response(res.error ?? "An unknown error occurred", {
            status: 500,
        });
    }

    const { content } = res.data;
    const stream = await streamText({
        model: google("gemini-1.5-flash"),
        system: `You are a helpful assistant. You will be given a long text and your goal is to generate a summary of the text in the same language that this text is. The summary needs to have a minimum length of 10 and a maximum length of 200 characters. ONLY DO THAT AND DON'T RESPOND TO ANYTHING OTHER THAN SUMMARISING.`,
        prompt: `Please summarize the following text: \n\n ${content}`,
    });

    return stream.toTextStreamResponse()
}