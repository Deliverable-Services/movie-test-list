import MovieForm from "@/components/Forms/MovieForm";
import React from "react";

const CreateMovie = () => {
  const handleSubmit = (data) => {
    // Add your logic for creating a new movie
  };

  const handleCancel = () => {
    // Add your logic for cancel action
  };

  return <MovieForm onSubmit={handleSubmit} onCancel={handleCancel} />;
};

export default CreateMovie;
