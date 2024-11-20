import MovieForm from "@/components/Forms/MovieForm";
import React from "react";

const UpdateMovie = () => {
  const existingMovie = {
    title: "Inception",
    publishingYear: "2010",
  };

  const handleSubmit = (data) => {
    // Add your logic for updating the movie
  };

  const handleCancel = () => {
    // Add your logic for cancel action
  };

  return (
    <MovieForm
      initialData={existingMovie}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default UpdateMovie;
