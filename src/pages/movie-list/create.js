import MovieForm from "@/components/Forms/MovieForm";
import React from "react";

const CreateMovie = () => {
  const handleSubmit = (data) => {
    console.log("New Movie Data:", data);
    // Add your logic for creating a new movie
  };

  const handleCancel = () => {
    console.log("Form canceled");
    // Add your logic for cancel action
  };

  return <MovieForm onSubmit={handleSubmit} onCancel={handleCancel} />;
};

export default CreateMovie;
