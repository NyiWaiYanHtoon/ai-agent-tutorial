export async function POST(req: Request) {
  const { input } = await req.json();
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: process.env.GROQ_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: `You are a Thai language teacher helping foreign learners.
                      When given a topic, your job is to:
                      List important Thai vocabulary words related to the topic.
                      Provide the pronunciation using only English letters (no Thai script).
                      Explain basic sentence structures related to the topic.
                      Keep the explanations simple, beginner-friendly, and easy to understand.
                      Do not use Thai alphabets at all. Only use English alphabets for everything.
                      If a word is tricky to pronounce, give a very easy phonetic spelling.
                      Keep answers clear, structured, and supportive for a complete beginner.`,
          },
          { role: "user", content: input },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    }
  );

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
