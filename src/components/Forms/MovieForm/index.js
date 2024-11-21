import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import { MovieFormContainer } from "./style";
import { UploadImageIcon } from "../../../../public/assets/images/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const MovieForm = ({ initialData, onCancel }) => {
  const methods = useForm({
    defaultValues: {},
  });
  const router = useRouter();

  const { movieId } = router.query;

  const { handleSubmit, reset, setValue } = methods;

  const [movieDetails, setMovieDetails] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const createMovie = async (data) => {
    const payload = {
      ...data,
      image: selectedFile?.filename,
    };
    try {
      const { data, status } = await axios.post(`/api/movie`, payload);
      if (data && status === 200) {
        toast.success(data?.message);
        reset();
        router.push("/movie-list");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchMovieDetails = async () => {
    try {
      const { data, status } = await axios.get(`/api/movie?movieId=${movieId}`);

      if (data && status === 200) {
        setMovieDetails(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateMovie = async (data) => {
    const payload = {
      ...data,
      image: selectedFile?.filename,
    };
    try {
      const { data, status } = await axios.put(
        `/api/movie?movieId=${movieId}`,
        payload
      );
      if (data && status === 200) {
        toast.success(data?.message);
        reset();
        router.push("/movie-list");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  useEffect(() => {
    if (movieDetails) {
      setValue("title", movieDetails?.title);
      setValue("publishYear", movieDetails?.publishYear);
      setValue("image", movieDetails?.image);
    }
  }, [movieDetails]);

  const onDrop = async (acceptedFile) => {
    const file = acceptedFile[0];
    if (file) {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      try {
        const { data, status } = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (data && status === 200) {
          setSelectedFile(data?.file);
        }
      } catch (error) {
        console.error("Error during file upload:", error);
      } finally {
        setUploading(false);
      }
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const renderDropzoneContent = () => {
    if (uploading) {
      return <p>Uploading...</p>;
    }

    if (isDragActive) {
      return <p>Drop the image here...</p>;
    }

    if (selectedFile?.filename) {
      return (
        <div>
          <img
            src={`/api/images/${selectedFile?.filename}` || movieDetails?.image}
            alt="Uploaded Preview"
            style={{
              width: "100%",
              maxWidth: "300px",
              marginBottom: "10px",
            }}
          />
          <p>Drag and drop another image to replace</p>
        </div>
      );
    }

    return (
      <div>
        <UploadImageIcon />
        <p>Drop an image here</p>
      </div>
    );
  };

  return (
    <MovieFormContainer>
      <h2>{movieId ? "Update Movie" : "Create a New Movie"}</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(movieId ? updateMovie : createMovie)}>
          <div
            {...getRootProps()}
            className="web-image-dropzone"
            style={{
              border: "2px dashed #ccc",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <input {...getInputProps()} />
            {renderDropzoneContent()}
          </div>

          <div className="movie-info">
            {/* Title Input */}
            <CustomInputField
              name="title"
              placeholder="Title"
              required
              customClass="title-field"
              register={"title"}
            />

            {/* Publishing Year Input */}
            <CustomInputField
              name="publishYear"
              placeholder="Publishing Year"
              type="number"
              required
              customClass="publish-field"
              register={"publishYear"}
            />

            {/* Dropzone for Image Upload */}
            <div
              {...getRootProps()}
              className="mob-image-dropzone"
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                margin: "20px 0",
              }}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the image here...</p>
              ) : uploadedImage ? (
                <div>
                  <img
                    src={uploadedImage}
                    alt="Uploaded Preview"
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      marginBottom: "10px",
                    }}
                  />
                  <p>Drag and drop another image to replace</p>
                </div>
              ) : (
                <div>
                  <UploadImageIcon />
                  <p>Upload an image here</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <CustomButton
                title="Cancel"
                onClick={onCancel}
                customClass="cancel-button"
              />
              <CustomButton
                title={`${movieId ? "Update" : "Submit"}`}
                type="submit"
                customClass="submit-button"
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </MovieFormContainer>
  );
};

export default MovieForm;
