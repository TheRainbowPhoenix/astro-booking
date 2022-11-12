import { getChannel } from "@utils/db";

export async function get({ params }) {
  const code = params.code;
  const channel = await getChannel(code);

  if (!channel) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(JSON.stringify(channel), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
