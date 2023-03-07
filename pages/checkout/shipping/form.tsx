import { useDispatch } from "react-redux";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import styled from "styled-components";

import { MdAccountCircle, MdEmail } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { useTypedSelector } from "../../../store/index";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactFlagsSelect from "react-flags-select";

import { Form, Field, Label, Input } from "../../../pages/login/styles";
import { selectUsers, addAddress } from "@/store/usersSlicer";
import { review } from "@/store/stepperSlicer";
import {
  newAddressOff,
  selectAddress,
  setactiveAddress,
  setinputAddress,
} from "@/store/addressSlicer";
import { animated, useTransition } from "react-spring";
import { useEffect, useState } from "react";
import countryData from "@/components/countryData";

type Inputs = {
  fullname: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
};

const AddressForm = () => {
  const dispatch: any = useDispatch();

  const { userInfo } = useTypedSelector(selectUsers);
  const { inputAddress } = useTypedSelector(selectAddress);
  const [selected, setSelected] = useState("");
  const [cNameInp, setcNameInp] = useState("");

  useEffect(() => {
    const X = inputAddress?.CountryName;
    const ctObject = countryData.find((ct) => X && ct.includes(X));
    const ctCode = X && ctObject && ctObject![0];
    const ctName = X && ctObject && ctObject![1];
    ctName && setcNameInp(ctName);
    ctCode && setSelected(ctCode);
  }, [inputAddress]);

  const id = userInfo?._id;

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("!"),
    street: Yup.string().required("!").min(3, "!"),
    city: Yup.string().required("!"),
    postcode: Yup.string().required("!"),
    country: Yup.string().required("!"),
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  console.log(errors);

  const submitHandler: SubmitHandler<Inputs> = async (userAddress) => {
    try {
      dispatch(addAddress({ id, userAddress }));
      dispatch(setactiveAddress(userInfo?.address?.length));
      dispatch(review());
      dispatch(newAddressOff());
      dispatch(setinputAddress(null));
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

  const errTransNm = useTransition(errors.fullname, animStyles);
  const errTransSt = useTransition(errors.street, animStyles);
  const errTransCt = useTransition(errors.city, animStyles);
  const errTransPc = useTransition(errors.postcode, animStyles);
  const errTransCr = useTransition(errors.country, animStyles);

  return (
    <FormA onSubmit={handleSubmit(submitHandler)} autoComplete="off">
      <Button type="submit">CONFIRM ADDRESS</Button>
      <FieldA>
        <Label>NAME</Label>
        <MdAccountCircle />
        <Input
          {...register("fullname")}
          type="fullname"
          placeholder="João Ninguém"
          defaultValue={userInfo ? userInfo.name : ""}
          className={`${errors.fullname ? "invalid" : ""}`}
        />
      </FieldA>
      <ErrorWrap>
        {errTransNm((styles, errfullname) =>
          errfullname ? (
            <Warn style={styles}>{errfullname?.message}</Warn>
          ) : null
        )}
      </ErrorWrap>

      <FieldA>
        <Label>STREET</Label>
        <MdEmail />
        <Input
          {...register("street")}
          type="street"
          placeholder="Av..."
          defaultValue={`${inputAddress?.Line1} ${inputAddress?.Line2} ${inputAddress?.Line3}`}
          className={`${errors.street ? "invalid" : ""}`}
        />
        <ErrorWrap>
          {errTransSt((styles, errstreet) =>
            errstreet ? <Warn style={styles}>{errstreet?.message}</Warn> : null
          )}
        </ErrorWrap>
      </FieldA>

      <FieldA>
        <Label>CITY</Label>
        <CiLocationOn />
        <Input
          {...register("city")}
          type="city"
          placeholder="city"
          defaultValue={`${inputAddress?.City}`}
          className={`${errors.city ? "invalid" : ""}`}
        />
        <ErrorWrap>
          {errTransCt((styles, errcity) =>
            errcity ? <Warn style={styles}>{errcity?.message}</Warn> : null
          )}
        </ErrorWrap>
      </FieldA>

      <FieldA>
        <Label>ZIP CODE</Label>
        <CiLocationOn />
        <Input
          {...register("postcode")}
          type="postcode"
          placeholder="postcode"
          defaultValue={`${inputAddress?.PostalCode}`}
          className={`${errors.postcode ? "invalid" : ""}`}
        />
        <ErrorWrap>
          {errTransPc((styles, errpostcode) =>
            errpostcode ? (
              <Warn style={styles}>{errpostcode?.message}</Warn>
            ) : null
          )}
        </ErrorWrap>
      </FieldA>

      <FieldCT>
        {/* <Label>COUNTRY</Label> */}
        {/* <BiWorld /> */}
        {/* <Input
          {...register("country")}
          type="country"
          id="country"
          defaultValue={`${inputAddress?.CountryName}`}
          className={`${errors.country ? "invalid" : ""}`}
        /> */}

        <Controller
          // name="country"
          control={control}
          {...register("country")}
          // defaultValue={`${inputAddress?.CountryName}`}
          render={({ field: { onChange, onBlur, value, ref } }) => {
            useEffect(() => {
              onChange(cNameInp);
            }, [cNameInp]);
            return (
              <ReactFlagsSelect
                // value={value}
                // onChange={onChange}
                className={`${errors.postcode ? "invalid" : ""}`}
                searchable
                searchPlaceholder="FIND COUNTRY"
                onSelect={(code) => {
                  setSelected(code);
                  const ctObject = countryData.find((ct) => ct.includes(code));
                  const ct = ctObject![1];
                  onChange(ct);
                }}
                selected={selected}
              />
            );
          }}
        />

        <ErrorWrap>
          {errTransCr((styles, errcountry) =>
            errcountry ? (
              <Warn style={styles}>{errcountry?.message}</Warn>
            ) : null
          )}
        </ErrorWrap>
      </FieldCT>
    </FormA>
  );
};

export default AddressForm;

const FormA = styled(Form)`
  padding: 0px 10px;

  margin: 0px auto;
  position: relative;
  box-shadow: none;
`;

const FieldA = styled(Field)`
  margin: 15px auto;
`;
const FieldCT = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  margin: 0px auto;
  padding: 0px;

  border-radius: 5px;
  box-shadow: 0px 0px 10px hsla(0, 0%, 0%, 0.3);

  div {
    position: absolute;
    width: 100%;
    padding: 0px;
    border-radius: 5px;
  }

  .invalid {
    transition: 0.3s;
    position: absolute;
    border: 2px solid hsla(0, 100%, 50%, 0.7);
  }

  button {
    height: 60px;
    border: none;
  }
`;

const ErrorWrap = styled(animated.div)`
  position: relative;
  pointer-events: none;
`;

export const Warn = styled(animated.span)`
  position: absolute;
  width: 25px;
  top: 0px;
  right: 2.5%;

  z-index: 2;
  font-size: 16px;
  text-align: center;

  // border: 1px solid hsla(360, 100%, 100%, 1);
  background: hsla(0, 80%, 57%, 1);
  border-radius: 3px;
  color: hsla(360, 100%, 100%, 1);
`;

const Button = styled.button`
  width: 100%;
  max-width: 600px;
  height: 35px;
  margin: 10px auto;

  background: hsla(340, 100%, 50%, 1);
  color: white;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;
