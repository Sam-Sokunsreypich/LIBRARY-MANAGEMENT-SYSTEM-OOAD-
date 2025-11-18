import { fetchCounts } from "./fetchCount";

export async function getCount() {
    const counts = await fetchCounts();
    return Response.json(counts);
  }

