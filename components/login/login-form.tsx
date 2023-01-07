import React from "react";
import { LoginInfo } from "@/models/index";
import { Button, Form } from "react-daisyui";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Shape } from "types/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import classNames from "classnames";

const schema = yup.object<Shape<LoginInfo>>({
  username: yup.string().min(5).max(10).required(),
  password: yup.string().min(8).max(32).required(),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginInfo>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = useCallback((data: LoginInfo) => {}, []);

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <input
        autoComplete="off"
        type="text"
        {...register("username")}
        placeholder="Username"
        className={classNames("input w-full max-w-xs", {
          "input-accent": !errors?.username,
          "input-error": errors?.username,
        })}
      />
      <p className="mt-1 text-sm text-red-600">{errors?.username?.message}</p>
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="mt-4 input input-bordered input-accent w-full max-w-xs"
      />
      <p className="mt-1 text-sm text-red-600">{errors?.password?.message}</p>
      <div className="pt-4 card-actions justify-center">
        <Button type="submit" className="btn btn-primary">
          Login
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;
