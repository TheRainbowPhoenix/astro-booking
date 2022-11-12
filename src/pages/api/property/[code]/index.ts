import { getProperty } from "@utils/db";

export async function get({ params }) {
  const code = params.code;
  const property = await getProperty(code);

  if (!property) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(JSON.stringify(property), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
