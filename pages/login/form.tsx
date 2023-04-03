import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { animated, useTransition, config } from "react-spring";
import { MdAccountCircle, MdEmail } from "react-icons/md";
import { HiLockOpen, HiLockClosed } from "react-icons/hi";

import { Field, Label, Submit, Form, Input, Warn, Err } from "./styles";
import { registerUser, loginUser, selectUsers } from "@/store/usersSlicer";
import { AppDispatch } from "@/store/index";
import { useTypedSelector } from "@/store/index";
import { selectload, setSubmitting } from "@/store/loadSlicer";
import { Router, useRouter } from "next/router";
import axios from "axios";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
};

const FormComponent = ({ reg }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { userLoading, errorMsg } = useTypedSelector(selectUsers);
  const { submitting } = useTypedSelector(selectload);
  const [forgot, setForgot] = useState(false);

  useEffect(() => {
    const change = !userLoading && submitting && !errorMsg;
    console.log(change);
  }, [userLoading, errorMsg, submitting]);

  useEffect(() => {
    reg && setForgot(false);
  }, [reg]);

  const validationSchemaRegister = Yup.object().shape({
    name: Yup.string().required("Name is required, Mr. X 🤪"),
    email: Yup.string()
      .required("Email is required 😅")
      .email("Email is invalid 🧐"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters long 😒")
      .required("Password is required 😅"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match 🧐 !!")
      .required("Confirm Password is required too. Don't forget 😊"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Hey! you need to accept the terms to register 😁"
    ),
  });

  const validationSchemaLogin = Yup.object().shape({
    email: Yup.string()
      .required("Email is required 😅")
      .email("Email is invalid 🧐"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters long 😒")
      .required("Password is required 😅"),
  });

  const validationForgot = Yup.object().shape({
    email: Yup.string()
      .required("Email is required 😅")
      .email("Email is invalid 🧐"),
  });

  const formOptions = {
    resolver: yupResolver(
      reg
        ? validationSchemaRegister
        : forgot
        ? validationForgot
        : validationSchemaLogin
    ),
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>(formOptions);

  const errorsExist = reg
    ? Object.keys(errors).length !== 0
    : errors.email || errors.password;

  const submitHandler: SubmitHandler<Inputs> = async (userData) => {
    try {
      const { name, email, password } = userData;
      dispatch(registerUser({ name, email, password }));
      dispatch(setSubmitting(true));
    } catch (err) {
      alert("something wrong is not right");
    }
  };

  const submitHandlerLogin: SubmitHandler<Inputs> = async (userData) => {
    try {
      const { email, password } = userData;
      dispatch(loginUser({ email, password }));
      dispatch(setSubmitting(true));
    } catch (err) {
      alert("something wrong is not right");
    }
  };
  const handleForgot: SubmitHandler<Inputs> = async (userData) => {
    try {
      dispatch(setSubmitting(true));
      const { email } = userData;

      const { data } = await axios.post("/api/email/resetpass", {
        email,
      });

      router.push("/profile/sent");
    } catch (err) {
      alert("something wrong is not right");
    }
  };

  const fieldStyles = {
    from: { opacity: 0, height: "0px" },
    enter: { opacity: 1, height: "60px" },
    leave: { opacity: 1, height: "0px" },
    delay: 0,
  };

  const switchSign = useTransition(reg, fieldStyles);

  const forgotSwitch = useTransition(forgot, fieldStyles);

  const animStyles = {
    from: { opacity: 0, transform: "translate3d(0, 50px, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 20px, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, -50px, 0)" },
    delay: 0,
  };

  const errTransNm = useTransition(errors.name, animStyles);
  const errTransEm = useTransition(errors.email, animStyles);
  const errTransPs = useTransition(errors.password, animStyles);
  const errTransCPs = useTransition(errors.confirmPassword, animStyles);
  const errTransAcp = useTransition(errors.acceptTerms, animStyles);

  return (
    <>
      <Form
        noValidate
        onSubmit={handleSubmit(
          reg ? submitHandler : forgot ? handleForgot : submitHandlerLogin
        )}
      >
        <SubmitWrap>
          <Submit type="submit" className={`${errorsExist ? "disabled" : ""}`}>
            {reg ? "REGISTER" : forgot ? "Reset Password" : "LOGIN"}
          </Submit>
        </SubmitWrap>

        {switchSign((styles, item) =>
          item ? (
            <>
              <FieldWrap style={styles}>
                <Field>
                  <Label>NAME</Label>
                  <MdAccountCircle />
                  <Input
                    {...register("name")}
                    type="name"
                    placeholder="João Ninguém"
                    defaultValue=""
                    className={`${errors.name ? "invalid" : ""}`}
                  />
                </Field>
              </FieldWrap>
              <ErrorWrap>
                {errTransNm((styles, errname) =>
                  errname && reg ? (
                    <Warn style={styles}>{errname?.message}</Warn>
                  ) : null
                )}
              </ErrorWrap>
            </>
          ) : null
        )}
        <Blank />
        <FieldWrap>
          <Field>
            <Label>E-MAIL</Label>
            <MdEmail />
            <Input
              {...register("email")}
              type="email"
              placeholder="email@gmail.com"
              defaultValue="@gmail.com"
              className={`${errors.email ? "invalid" : ""}`}
            />
          </Field>
        </FieldWrap>
        <ErrorWrap>
          {errTransEm((styles, erremail) =>
            erremail ? <Warn style={styles}>{erremail?.message}</Warn> : null
          )}
        </ErrorWrap>

        <Blank />
        {forgotSwitch((styles, item) =>
          !item ? (
            <>
              <FieldWrap style={styles}>
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
                  errpass ? (
                    <Warn style={styles}>{errpass?.message}</Warn>
                  ) : null
                )}
              </ErrorWrap>
            </>
          ) : null
        )}
        <Blank />
        {!reg && (
          <div
            style={{ textAlign: "center" }}
            onClick={() => setForgot(!forgot)}
          >
            {forgot ? "Cancel" : "Forgot Password?"}
          </div>
        )}

        {switchSign((styles, item) =>
          item ? (
            <>
              <FieldWrap style={styles}>
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
                  errconf && reg ? (
                    <Warn style={styles}>{errconf?.message}</Warn>
                  ) : null
                )}
              </ErrorWrap>
            </>
          ) : null
        )}
        {switchSign((styles, item) =>
          item ? (
            <>
              <AcceptWrap style={styles}>
                <AcceptField>
                  <label htmlFor="acceptTerms">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <input
                        {...register("acceptTerms")}
                        type="checkbox"
                        id="acceptTerms"
                        className={`${errors.acceptTerms ? "invalid" : ""}`}
                      />
                      <div>Accept Terms & Conditions</div>
                    </div>
                  </label>
                </AcceptField>
              </AcceptWrap>

              <ErrorWrap>
                {errTransAcp((styles, erracpt) =>
                  erracpt && reg ? (
                    <Warn style={styles}>{erracpt?.message}</Warn>
                  ) : null
                )}
              </ErrorWrap>
            </>
          ) : null
        )}
      </Form>
      {errorMsg ? (
        <Err>
          <h6>{errorMsg.message}</h6>
        </Err>
      ) : null}
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

const AcceptWrap = styled(animated.div)`
  position: relative;
  width: 95%;
  margin: 0px auto;
  overflow: hidden;
`;

const AcceptField = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  margin: 10px auto;
  padding: 0px;

  input {
    margin: 10px;
  }

  .invalid {
    transition: 0.3s;
    border: 2px solid hsla(0, 100%, 50%, 0.7);
  }
`;
