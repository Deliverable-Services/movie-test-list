import clientPromise from "@/lib/mongodb";
import { BSON, ObjectId } from "mongodb";

export const config = {
  api: {
    bodyParser: true,
  },
};

async function createMovie(req, res, db) {
  const { title, publishYear, image } = req.body;

  if (!title || !publishYear || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const result = await db.collection("movies").insertOne({
      title,
      publishYear,
      image,
      createdAt: new Date(),
    });
    return res.status(200).json({
      message: "Movie created successfully!",
      movie: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getMovies(req, res, db) {
  const { movieId, page = 1 } = req.query;
  const pageSize = 8;

  try {
    if (movieId) {
      if (!ObjectId.isValid(movieId)) {
        return res.status(400).json({ error: "Invalid movieId" });
      }

      const movie = await db
        .collection("movies")
        .findOne({ _id: new ObjectId({ id: movieId }) });
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      return res.status(200).json(movie);
    } else {
      const skip = (parseInt(page) - 1) * pageSize;
      const movies = await db
        .collection("movies")
        .find()
        .skip(skip)
        .limit(pageSize)
        .toArray();

      const totalMovies = await db.collection("movies").countDocuments();

      return res.status(200).json({
        movies,
        totalMovies,
        totalPages: Math.ceil(totalMovies / pageSize),
        currentPage: parseInt(page),
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateMovie(req, res, db) {
  const { movieId } = req.query;
  const { title, publishYear, image } = req.body;

  if (!movieId) {
    return res.status(400).json({ message: "Movie ID is required" });
  }

  if (!ObjectId.isValid(movieId)) {
    return res.status(400).json({ error: "Invalid movieId" });
  }

  const result = await db
    .collection("movies")
    .updateOne(
      { _id: new ObjectId({ id: movieId }) },
      { $set: { title, publishYear, image, updatedAt: new Date() } }
    );

  return res.status(200).json({
    message: "Movie updated successfully",
    movie: {
      title,
      publishYear,
      image,
      updatedAt: new Date(),
    },
  });
}

async function deleteMovie(req, res, db) {
  const { movieId } = req.query;
  if (!movieId) {
    return res.status(400).json({ message: "Movie ID is required" });
  }

  if (!ObjectId.isValid(movieId)) {
    return res.status(400).json({ error: "Invalid movieId" });
  }

  const result = await db
    .collection("movies")
    .deleteOne({ _id: new ObjectId({ id: movieId }) });

  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "Movie not found" });
  }

  return res.status(200).json({ message: "Movie deleted successfully" });
}

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("test");

  try {
    switch (req.method) {
      case "POST":
        await createMovie(req, res, db);
        break;
      case "GET":
        await getMovies(req, res, db);
        break;
      case "PUT":
        await updateMovie(req, res, db);
        break;
      case "DELETE":
        await deleteMovie(req, res, db);
        break;
      default:
        res.status(405).json({ message: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
