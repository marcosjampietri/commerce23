import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { animated, useTransition } from "react-spring";
import { HiLockOpen, HiLockClosed } from "react-icons/hi";

import { Field, Label, Submit, Form, Input, Warn, Err } from "../login/styles";

import { AppDispatch } from "@/store/index";

import { setSubmitting } from "@/store/loadSlicer";
import axios from "axios";
import { useRouter } from "next/router";

type Inputs = {
  password: string;
  confirmPassword?: string;
};

const FormComponent = () => {
  const router = useRouter();

  const { token } = router.query;

  const validationSchemaRegister = Yup.object().shape({
    password: Yup.string()
      .min(3, "Password must be at least 3 characters long 😒")
      .required("Password is required 😅"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match 🧐 !!")
      .required("Confirm Password is required too. Don't forget 😊"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchemaRegister),
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>(formOptions);

  const errorsExist = Object.keys(errors).length !== 0;

  const submitHandler: SubmitHandler<Inputs> = async (userData) => {
    // dispatch(setSubmitting(true));
    try {
      const { password, confirmPassword } = userData;

      const res = axios.patch("/api/auth/reset", {
        token,
        password,
        confirmPassword,
      });

      router.push("/profile/changed");
    } catch (err) {
      alert("something wrong is not right");
    }
  };

  const animStyles = {
    from: { opacity: 0, transform: "translate3d(0, 50px, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 20px, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, -50px, 0)" },
    delay: 0,
  };

  const errTransPs = useTransition(errors.password, animStyles);
  const errTransCPs = useTransition(errors.confirmPassword, animStyles);

  return (
    <>
      <form
        style={{ maxWidth: "600px", margin: "70px auto" }}
        noValidate
        onSubmit={handleSubmit(submitHandler)}
      >
        <SubmitWrap>
          <Submit type="submit" className={`${errorsExist ? "disabled" : ""}`}>
            "CONFIRM"
          </Submit>
        </SubmitWrap>

        <FieldWrap>
          <Field>
            <Label>PASSWORD</Label>
            <HiLockOpen />
            <Input
              {...register("password")}
              type="password"
              placeholder="password"
              defaultValue=""
              className={`${errors.password ? "invalid" : ""}`}
            />
          </Field>
        </FieldWrap>
        <ErrorWrap>
          {errTransPs((styles, errpass) =>
            errpass ? <Warn style={styles}>{errpass?.message}</Warn> : null
          )}
        </ErrorWrap>
        <Blank />

        <FieldWrap>
          <Field>
            <Label>CONFIRM PASSWORD</Label>
            <HiLockClosed />
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="confirm your password"
              defaultValue=""
              className={`${errors.confirmPassword ? "invalid" : ""}`}
            />
          </Field>
        </FieldWrap>
        <ErrorWrap>
          {errTransCPs((styles, errconf) =>
            errconf ? <Warn style={styles}>{errconf?.message}</Warn> : null
          )}
        </ErrorWrap>
      </form>
      {/* {errorMsg ? (
        <Err>
          <h6>{errorMsg.message}</h6>
        </Err>
      ) : null} */}
    </>
  );
};

export default FormComponent;

const FieldWrap = styled(animated.div)`
  position: relative;
  width: 95%;
  margin: 0px auto;
  overflow: hidden;
  border-radius: 5px;

  box-shadow: 2px 3px 15px hsla(220, 10%, 50%, 0.3);
`;

const Blank = styled.div`
  height: 5vh;
`;

const SubmitWrap = styled.div`
  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100vw;
  height: 60px;
  z-index: 10;

  background: white;
  box-shadow: 0px 0px 15px hsla(0, 0%, 0%, 0.3);

  display: flex;
  align-items: center;
`;

const ErrorWrap = styled(animated.div)`
  position: relative;
`;
