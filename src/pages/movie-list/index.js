import MovieCard from "@/components/MovieCard";
import { MoviesListContainer } from "@/styles/movies-list-style";
import React, { useEffect, useState } from "react";
import { AddMoviesIcon, LogoutIcon } from "../../../public/assets/images/icons";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

function MovieList() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const itemsPerPage = 8;

  const handleNext = () => {
    if (currentPage < totalCount) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (localStorage.getItem("moviesData")) {
      const data = JSON.parse(localStorage.getItem("moviesData"));
      setUserDetails(data);
    }
  }, []);

  const fetchMovies = async () => {
    try {
      const { data, status } = await axios.get(
        `/api/movie?page=${currentPage}`
      );
      if (data && status === 200) {
        setMovies(data?.movies);
        setTotalCount(data?.totalMovies);
        setTotalPages(data?.totalPages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      const { data, status } = await axios.delete(
        `/api/movie?movieId=${movieId}`
      );
      if (data && status === 200) {
        toast.success(data?.message);
        fetchMovies();
      }
    } catch (error) {
      toast.success(error?.response?.data?.message);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("moviesData");
    localStorage.removeItem("moviesToken");
    toast.success("Logged Out successfully!");
    router.push("/sign-in");
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  return (
    <MoviesListContainer currentPage={currentPage}>
      {isLoading ? (
        <Spinner />
      ) : movies.length > 0 ? (
        <div>
          <div className="movie-list-heading">
            <h2>
              My Movies
              {userDetails && userDetails?.role === "admin" && (
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push("/movie-list/create")}
                >
                  <AddMoviesIcon />
                </p>
              )}
            </h2>
            <p onClick={handleLogOut} style={{ cursor: "pointer" }}>
              <span>Logout</span> <LogoutIcon />
            </p>
          </div>
          <div className="movie-list-content">
            {movies?.map((item, index) => (
              <MovieCard
                key={index + (currentPage - 1) * itemsPerPage}
                image={item?.image}
                title={item?.title}
                year={item?.publishYear}
                movieId={item?._id}
                deleteMovie={deleteMovie}
                userDetails={userDetails}
              />
            ))}
          </div>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={handlePrev}
              className="prev-btn"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className="page-number"
                style={{
                  backgroundColor:
                    currentPage === index + 1
                      ? "var(--primary)"
                      : "var(--card-color)",
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNext}
              className="next-btn"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-list">
          <h2>Your movie list is empty</h2>
          <CustomButton
            title="Add a new movie"
            customClass="add-new-movie"
            onClick={() => router.push("/movie-list/create")}
          />
        </div>
      )}
    </MoviesListContainer>
  );
}

export default MovieList;
