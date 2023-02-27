import { useState, useEffect } from "react";
import styled from "styled-components";
import { animated, useTransition, config, useTrail } from "react-spring";
import useScrollTo from "react-spring-scroll-to-hook";
import { below } from "@/styles/breakpoints";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Hero = () => {
  const [picIndex, setpicIndex] = useState(0);
  const [auto, setauto] = useState(false);
  const [disable, setDisable] = useState(false);
  const [show, setshow] = useState(false);

  const backPic = [
    {
      url: "https://res.cloudinary.com/marcos-jampietri/image/upload/c_scale,w_800/v1656456605/IMG_20220511_164505_euksct.jpg",
      pos: "center top",
    },
    {
      url: "https://res.cloudinary.com/marcos-jampietri/image/upload/c_scale,w_800/v1656456611/IMG_20220511_164323_slxges.jpg",
      pos: "center center",
    },
    {
      url: "https://res.cloudinary.com/marcos-jampietri/image/upload/c_scale,w_800/v1656456621/IMG_20220306_141507_bjwraw.jpg",
      pos: "center center",
    },
    {
      url: "https://res.cloudinary.com/marcos-jampietri/image/upload/v1656456630/vaso_e_roma_33_tmpqjt.jpg",
      pos: "center center",
    },
  ];

  useEffect(() => {
    setshow(true);
  }, []);

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

  const slidePic = useTransition(picIndex, {
    key: picIndex,
    from: {
      // transform: "translate3d(100vw, 0vh,0)",
      opacity: 0,
    },
    enter: {
      // transform: "translate3d(0vw,0vh,0)",
      opacity: 1,
    },
    leave: {
      // transform: "translate3d(-100vw,0vh,0)",
      opacity: 1,
    },
  });

  const { scrollTo }: any = useScrollTo(config.slow);

  const prev = () => {
    if (picIndex == 0) {
      null;
    } else {
      setpicIndex((state) => (state - 1) % backPic.length);
    }
  };
  const next = () => {
    setpicIndex((state) => (state + 1) % backPic.length);
  };

  const titleTrail = `MEET_THE_ULTIMATE_-ONLINE_SHOPPING_EXPERIENCE`;
  const titleTrail1 = `MOST_BEAUTIFUL`;
  const titleTrail2 = `SHOP_EVER`;
  // const line1 = "Ceramics_Inspired_By_Places_And_The_Simplest_Forms_Of_Nature";
  const line1 = "Getting_Rid_Of_Shopify_Fees_And_Your_Current_Plataform_Costs";
  {
    /* const text = Array.from("the_best_online_shop_you_ve_ever_seen"); */
  }

  interface trailProps {
    position?: number;
  }

  const conf = { tension: 650, friction: 15, frequency: 0.3 };

  const configs1 = {
    config: conf,
    opacity: show ? 1 : 0,
    x: show ? 0 : 30,
    delay: 0,
  };

  const configs2 = {
    config: conf,
    opacity: show ? 1 : 0,
    y: show ? 0 : -10,
    delay: 0,
  };

  const line1Trail = useTrail<trailProps>(line1.length, configs1);
  const tTrail1 = useTrail<trailProps>(titleTrail1.length, configs2);
  const tTrail2 = useTrail<trailProps>(titleTrail2.length, configs2);

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

        <ButtonP
          onClick={() => {
            prev();
            setDisable(true);
            setauto(false);
          }}
          disabled={disable}
        >
          <IoIosArrowBack />
        </ButtonP>
        <ButtonN
          onClick={() => {
            next();
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

      {/* <TextWrap onClick={() => setshow(!show)}>
        <div>
          {tTrail1.map(({ y, ...otherProps }, i) => (
            <Title
              key={i}
              style={{
                ...otherProps,
                transform: y.to((y: any) => `translate3d(0, ${y}vh, 0)`),
                marginTop: "0.6em",
              }}
            >
              {titleTrail1[i] !== "_" ? (
                titleTrail1[i].replace(/-/g, ``)
              ) : (
                <div style={{ color: "transparent" }}>&nbsp;</div>
              )}
            </Title>
          ))}
        </div>
        <div>
          {tTrail2.map(({ y, ...otherProps }, i) => (
            <Title
              key={i}
              style={{
                ...otherProps,
                transform: y.to((y: any) => `translate3d(0, ${y}vh, 0)`),
                marginBottom: "0.2em",
              }}
            >
              {titleTrail2[i] !== "_" ? (
                titleTrail2[i].replace(/-/g, ``)
              ) : (
                <div style={{ color: "transparent" }}>&nbsp;</div>
              )}
            </Title>
          ))}
        </div>
        <div>
          {line1Trail.map(({ x, ...otherProps }, i) => (
            <Call
              key={i}
              style={{
                ...otherProps,
                transform: x.to((x: any) => `translate3d( ${x}vw, 0, 0)`),
              }}
            >
              {line1[i] !== "_" ? (
                line1[i]
              ) : (
                <div style={{ color: "transparent" }}>&nbsp;</div>
              )}
            </Call>
          ))}
        </div>
      </TextWrap> */}
      <CTAWrap>
        <CTA onClick={() => scrollTo(document.querySelector("#New-Items"))}>
          START SHOPPING
        </CTA>
      </CTAWrap>

      {slidePic((styles, index) => (
        <Overlay>
          <animated.div
            style={{
              ...styles,
              backgroundImage: `url(${backPic[index].url})`,
              backgroundPosition: `${backPic[index].pos}`,
            }}
          />
        </Overlay>
      ))}
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
  background-position: left top;
  background-blend-mode: screen;
  box-shadow: inset 2px 2px 15px hsla(0, 0%, 0%, 0.5);
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
  bottom: 15px;
  z-index: 3;
  right: 15px;

  // svg {
  //     position: relative;
  //     top: 2px;
  //     left: 1px;
  // }
`;
const ButtonP = styled(Button)`
  bottom: 15px;
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
