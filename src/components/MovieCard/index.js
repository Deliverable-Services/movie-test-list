import React from "react";
import { MovieCardContainer } from "./style";
import { useRouter } from "next/router";
import axios from "axios";
import DeleteIcon from "../Icons/DeleteIcon";
import Editicon from "../Icons/Editicon";

const MovieCard = ({
  image,
  title,
  year,
  movieId,
  deleteMovie,
  userDetails,
}) => {
  const router = useRouter();

  return (
    <MovieCardContainer>
      <img src={image} alt={title} className="movie-image" />
      <div className="movie-info">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 className="movie-title">{title}</h3>
          {userDetails?.role === "admin" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              <span onClick={() => deleteMovie(movieId)}>
                <DeleteIcon />
              </span>
              <span
                onClick={() =>
                  router.push(`/movie-list/create?movieId=${movieId}`)
                }
              >
                <Editicon />
              </span>
            </div>
          )}
        </div>
        <p className="movie-year">{year}</p>
      </div>
    </MovieCardContainer>
  );
};

export default MovieCard;
