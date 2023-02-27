import { useState, useEffect } from "react";
import Img from "next/image";
import styled from "styled-components";
import { animated, useTransition, useSpring, config } from "react-spring";
import { RiDoubleQuotesR } from "react-icons/ri";
import { useDrag } from "@use-gesture/react";
import { Margin } from "../styles/globalSC";
import usePrevious from "./usePrevious";

const Testimonials = () => {
  const [testIndex, settestIndex] = useState(0);
  const [auto, setauto] = useState(false);
  const [disable, setDisable] = useState(false);

  const testimonials = [
    {
      tx: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae tincidunt turpis. Fusce posuere tempus orci, sit amet sollicitudin lectus ullamcorper eu. Duis malesuada ultrices mattis. Aliquam lobortis quis nisi tempor sagittis. Curabitur sagittis eget diam non posuere.",
      pic: "https://plus.unsplash.com/premium_photo-1661686687486-2329be3e383f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3132&q=80",
      name: "Jane",
      role: "Entrepreneur",
    },
    {
      tx: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae tincidunt turpis. Fusce posuere tempus orci, sit amet sollicitudin lectus ullamcorper eu. Duis malesuada ultrices mattis. Aliquam lobortis quis nisi tempor sagittis. Curabitur sagittis eget diam non posuere.",
      pic: "https://images.unsplash.com/photo-1588731234159-8b9963143fca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      name: "John",
      role: "Busniess Consultant",
    },
    {
      tx: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae tincidunt turpis. Fusce posuere tempus orci, sit amet sollicitudin lectus ullamcorper eu. Duis malesuada ultrices mattis. Aliquam lobortis quis nisi tempor sagittis. Curabitur sagittis eget diam non posuere.",
      pic: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      name: "Danny",
      role: "Manager",
    },
    {
      tx: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae tincidunt turpis. Fusce posuere tempus orci, sit amet sollicitudin lectus ullamcorper eu. Duis malesuada ultrices mattis. Aliquam lobortis quis nisi tempor sagittis. Curabitur sagittis eget diam non posuere.",
      pic: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
      name: "Melissa",
      role: "Bon Vivant",
    },
  ];

  const prevtestIndex = usePrevious(testIndex);
  const rev = prevtestIndex! > testIndex;

  const transition = useTransition(testIndex, {
    from: {
      transform: `translate3d(${rev ? "-" : ""}100vw, 0vh,0)`,
    },
    enter: {
      transform: "translate3d(0vw,0vh,0)",
    },
    leave: {
      transform: `translate3d(${rev ? "" : "-"}100vw, 0vh,0)`,
    },
    config: config.slow,
  });

  const L = testimonials.length;
  const [{ x }, api] = useSpring(() => ({
    x: 0,
  }));
  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], cancel, canceled }) => {
      if (down && Math.abs(mx) > 100) {
        const move = xDir > 0 ? -1 : 1;

        cancel();
        if (canceled)
          testIndex > 0
            ? settestIndex((state) => (state + move) % L)
            : settestIndex(xDir > 0 ? L - 1 : 1);
      }
      api.start({ x: down && !canceled ? mx : 0 }), { axis: "x" };
    }
  );

  return (
    <Section>
      <Margin style={{ display: "block" }}>
        <Title>
          <RiDoubleQuotesR />
          <div>
            <p>OUR CLIENTS` SUCCESFULL HISTORY</p>
            <h2>Testimonial from our clients</h2>
          </div>
        </Title>
        <CarrWrap>
          {transition((styles, item) => (
            <Carroussel {...bind()} key={testIndex} style={{ ...styles, x }}>
              <h3>{testimonials[item].tx}</h3>
              <div>
                <img src={testimonials[item].pic} alt="" />
                <p>
                  {`  ${testimonials[item].name}`} <br />{" "}
                  <span> {testimonials[item].role} </span>
                </p>
              </div>
            </Carroussel>
          ))}
          <Dots>
            {[...Array(testimonials.length)].map((_, dotIndex) => (
              <div
                key={dotIndex}
                onClick={() => {
                  settestIndex(dotIndex);
                  setauto(false);
                }}
                className={`${dotIndex == testIndex ? "active" : ""}`}
              />
            ))}
          </Dots>
        </CarrWrap>
      </Margin>
    </Section>
  );
};

export default Testimonials;

const Section = styled.section`
  width: 100vw;

  padding: 70px 0px 50px 0px;
  overflow: hidden;
  background: hsla(35, 25%, 100%, 1);
`;

const Title = styled(animated.div)`
  width: 100vw;

  margin-bottom: 50px;

  background: hsla(348, 100%, 0%, 0);

  display: flex;
  align-items: center;
  // justify-content: center;

  div {
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
  }
  p,
  h2,
  svg {
    margin-bottom: 1em;
  }

  p {
    letter-spacing: 2px;
    max-width: 600px;
    color: hsla(35, 25%, 30%, 1);
    /* font-family: Bebas Neue; */
  }
  h2 {
    display: block;
    margin: 0 auto;
    font-size: clamp(27px, 5vw, 40px);
    font-weight: 600;
    font-family: Montserrat;
    color: hsla(35, 25%, 40%, 1);
  }

  svg {
    font-size: 80px;
    fill: hsla(35, 25%, 75%, 1);
  }
`;

const CarrWrap = styled.div`
  width: 95%;
  height: 100%;
  margin: 0px auto;
  padding: 20px 10px;

  border-top: 3px solid hsla(35, 25%, 75%, 1);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

const Carroussel = styled(animated.div)`
  position: relative;

  grid-column: 1;
  grid-row: 1;
  width: fit-content;
  margin: 0px auto;
  touch-action: pan-y;
  overflow: hidden;

  //background: grey;
  -webkit-user-select: none;

  h3 {
    //width: 100%;
    max-width: 800px;
    // padding: 0px 10px;

    margin-bottom: 20px;
    font-family: Montserrat, Sans-Serif;
    font-weight: 300;
    font-size: clamp(16px, 2vw, 22px);
    text-align: justify;
    letter-spacing: 1.5px;
    line-height: 1.5em;
    color: hsla(0, 0%, 40%, 1);
  }

  div {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;

      border-radius: 50%;
      background: hsla(360, 100%, 50%, 0.1);
      object-size: cover;
      object-fit: cover;

      object-position: center top;
    }
    p {
      //width: 100%;
      max-width: 800px;
      padding: 0px 15px;

      font-family: Montserrat, Sans-Serif;
      font-weight: 400;
      font-size: 18px;
      letter-spacing: 0px;
      line-height: 1.5em;
      color: hsla(0, 0%, 40%, 1);
      white-space: pre;

      transform: scaleX(1.2);

      span {
        font-weight: 200;
        font-size: 16px;
        color: hsla(0, 0%, 60%, 1);
      }
    }
  }
`;

const Dots = styled.div`
  position: relative;
  height: fit-content;
  top: -70px;
  grid-column: 1;
  grid-row: 1;
  width: 100%;

  display: flex;
  justify-content: center;

  div {
    flex: 0 0 10px;
    width: 10px;
    height: 10px;
    margin: 10px;
    transform: scale(1);

    border-radius: 50%;
    border: 1px solid hsla(35, 25%, 30%, 1);
    box-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0);
    transition: 0.5s;
  }
  .active {
    transition: 0.03s;
    transform: scale(1.5);

    background: hsla(35, 25%, 50%, 1);
    border: 1px solid hsla(0, 0%, 0%, 0);
    box-shadow: 1px 1px 5px hsla(0, 0%, 0%, 0.3);
  }
`;
