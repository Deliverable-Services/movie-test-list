import CustomButton from "@/components/CustomButton";
import CustomInputField from "@/components/CustomInputField";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { SignInContainer } from "./style";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const SignInForm = () => {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    register,
  } = methods;

  const onSubmit = async (data) => {
    const payload = {
      email: data?.email,
      password: data?.password,
    };
    try {
      const { data, status } = await axios.post(
        "http://localhost:3000/api/login",
        payload
      );
      if (data && status === 200) {
        localStorage.setItem("moviesToken", data?.accessToken);
        localStorage.setItem("moviesData", JSON.stringify(data?.user));
        toast.success(data?.message);
        router.push("/movie-list");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <SignInContainer>
      <h1>Sign in</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <CustomInputField
            name="email"
            type="email"
            placeholder="Email"
            required={{ value: true, message: "Email is required" }}
            className={errors.email ? "input-error" : ""}
            {...register("email")}
          />

          {/* Password Input */}
          <CustomInputField
            name="password"
            type="password"
            placeholder="Password"
            required={{ value: true, message: "Password is required" }}
            className={errors.password ? "input-error" : ""}
            {...register("password")}
          />

          {/* Remember Me Checkbox */}
          <div className="remember-me">
            <label>
              <input type="checkbox" {...methods.register("rememberMe")} />
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <CustomButton title="Login" type="submit" />
        </form>
      </FormProvider>
    </SignInContainer>
  );
};

export default SignInForm;
