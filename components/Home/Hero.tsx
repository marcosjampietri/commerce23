import { useState, useEffect } from "react";
import styled from "styled-components";
import { animated, useTransition, config, useTrail } from "react-spring";
import useScrollTo from "react-spring-scroll-to-hook";
import { below } from "@/styles/breakpoints";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import usePrevious from "../Hooks/usePrevious";

const Hero = () => {
  const [picIndex, setpicIndex] = useState(0);
  const [auto, setauto] = useState(false);
  const [disable, setDisable] = useState(false);

  const backPic = [
    {
      url: "https://images.unsplash.com/photo-1565206077212-4eb48d41f54b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      pos: "center center",
    },
    {
      url: "https://images.unsplash.com/photo-1622976367840-1803861fff6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1315&q=80",
      pos: "center 80%",
    },
    {
      url: "https://images.unsplash.com/photo-1532140588319-cfd0b67af829?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2330&q=80",
      pos: "center center",
    },
  ];

  useEffect(() => {
    if (auto) {
      const t = setInterval(
        () => setpicIndex((state) => (state + 1) % backPic.length),
        6000
      );
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setauto(true), 12000);
      return () => clearTimeout(t);
    }
  }, [auto]);

  if (disable) {
    setTimeout(setDisable, 1200);
  }

  const VW = window.innerWidth;
  const prevPic = usePrevious(picIndex);
  const reverse = prevPic! > picIndex;

  const slidePic = useTransition(picIndex, {
    from: { opacity: 1, x: reverse ? -VW : VW },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 1, x: reverse ? VW : -VW },
    config: config.slow,
  });

  const { scrollTo }: any = useScrollTo(config.slow);

  return (
    <Section role="hero">
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "50vh",
        }}
      >
        {slidePic((styles, index) => (
          <Carroussel
            style={{
              ...styles,
              backgroundImage: `url(${backPic[index].url})`,
              backgroundPosition: `${backPic[index].pos}`,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            boxShadow: "inset 2px 2px 25px hsla(0, 0%, 0%, 0.5)",
            width: "200%",
            height: "100%",
          }}
        />

        <ButtonP
          onClick={() => {
            picIndex == 0
              ? setpicIndex(backPic.length - 1)
              : setpicIndex((state) => (state - 1) % backPic.length);
            setDisable(true);
            setauto(false);
          }}
          disabled={disable}
        >
          <IoIosArrowBack />
        </ButtonP>
        <ButtonN
          onClick={() => {
            setpicIndex((state) => (state + 1) % backPic.length);
            setDisable(true);
            setauto(false);
          }}
          disabled={disable}
        >
          <IoIosArrowForward />
        </ButtonN>
        <Dots>
          {[...Array(backPic.length)].map((_, dotIndex) => (
            <div
              className={`${dotIndex == picIndex ? "active" : ""}`}
              key={dotIndex}
              onClick={() => {
                setpicIndex(dotIndex);
                setauto(false);
              }}
            />
          ))}
        </Dots>
      </div>
      <CTAWrap>
        <CTA onClick={() => scrollTo(document.querySelector("#New-Items"))}>
          START SHOPPING
        </CTA>
      </CTAWrap>

      {/* {slidePic((styles, index) => (
        <Overlay>
          <animated.div
            style={{
              ...styles,
              backgroundImage: `url(${backPic[index].url})`,
              backgroundPosition: `${backPic[index].pos}`,
            }}
          />
        </Overlay>
      ))} */}
    </Section>
  );
};

export default Hero;

const Section = styled.section`
  position: relative;

  width: 100vw;
  height: 100vh;
  margin: 0px auto;

  padding: 0px 0px 0px;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(animated.div)`
  position: absolute;
  width: 80vw;
  height: 80vh;
  top: 80px;

  opacity: 0.8;
  filter: drop-shadow(-1px 6px 10px hsla(0, 0%, 0%, 0.2));

  div {
    clip-path: polygon(
      0% 0%,
      0% 100%,
      3% 100%,
      3% 3%,
      97% 3%,
      97% 97%,
      3% 97%,
      3% 100%,
      100% 100%,
      100% 0%
    );
    width: 100%;
    height: 100%;
  }
`;

const Carroussel = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 50vh;

  background-size: cover;
`;

const CTAWrap = styled.div`
  position: absolute;
  bottom: 5vh;
  width: 100vw;
  min-width: 150px;
  height: 10vh;
  z-index: 10;
`;

const CTA = styled.button`
  width: 50vw;
  min-width: 150px;
  height: 50px;
  max-height: 150px;
  margin: 0vh 25vw;
  z-index: 10;

  font-size: clamp(16px, 2vw, 34px);
  text-align: center;
  font-weight: 200;
  color: white;
  background: black;
  cursor: pointer;
  border-radius: 25vw;
  border: 1px solid hsla(0, 0%, 25%, 1);
  box-shadow: 2px 4px 12px hsla(0, 0%, 0%, 0.8);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dots = styled.div`
  position: absolute;
  width: 100%;
  bottom: -40px;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    flex: 0 0 10px;
    width: 10px;
    height: 10px;
    margin: 10px;
    transform: scale(1);

    border-radius: 50%;
    border: 1px solid hsla(0, 0%, 10%, 1);
    box-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0);
    transition: 0.9s;
  }
  .active {
    transition: 0.07s;
    transform: scale(1.5);

    background: hsla(0, 0%, 0%, 1);
    border: 1px solid hsla(0, 0%, 70%, 1);
    box-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0.5);
  }
`;

const Button = styled.button`
  position: absolute;
  width: 54px;
  height: 54px;

  cursor: pointer;
  background: hsla(0, 0%, 0%, 0.2);
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  border-radius: 4px;
  font-size: 26px;

  display: grid;
  place-items: center;

  svg {
    fill: hsla(0, 0%, 100%, 0.7);
  }
`;
const ButtonN = styled(Button)`
  bottom: 45%;
  z-index: 3;
  right: 15px;

  // svg {
  //     position: relative;
  //     top: 2px;
  //     left: 1px;
  // }
`;
const ButtonP = styled(Button)`
  bottom: 45%;
  z-index: 3;
  left: 15px;
  // svg {
  //     position: relative;
  //     top: 2px;
  //     left: -1px;
  // }
`;

const TextWrap = styled.div`
  position: absolute;
  width: 100vw;

  background: hsla(0, 0%, 100%, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 2px 2px 15px hsla(0, 0%, 0%, 0.2);
  z-index: 2;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Call = styled(animated.h2)`
  color: hsla(0, 0%, 30%, 1);
  font-size: clamp(8px, 2.2vw, 18px);
  letter-spacing: 0.04em;
  line-height: 0.8em;
  font-weight: 200;
`;

const Title = styled(animated.h1)`
  height: 0.8em;
  margin: 15px 0px 10px;

  color: hsla(0, 0%, 10%, 1);

  font-size: clamp(18px, 5vw, 45px);
  letter-spacing: 0.05em;
  font-weight: bold;
  line-height: 0.5em;

  ${below.small`
    font-size: clamp(12px, 5vw, 50px);
        
    `};

  div {
  }
`;
