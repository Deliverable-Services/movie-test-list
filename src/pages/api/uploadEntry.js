import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const result = await db.collection("images").insertOne(req.body);

    return res.status(200).json({
      message: "Created successfully!",
      movie: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
