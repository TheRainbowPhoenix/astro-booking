import { getRooms } from "@utils/db";

export async function get({ params }) {
  const code = params.code;
  const rooms = await getRooms(code);

  if (!rooms) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(JSON.stringify(rooms), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
