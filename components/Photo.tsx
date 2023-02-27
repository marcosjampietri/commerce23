import styled from "styled-components";
import { animated, useScroll } from "react-spring";

const Services = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <Section>
        <Img>
          <animated.img
            style={{
              transform: scrollYProgress.to(
                (prlx) => `translateY(${10 + prlx * -50}%)`
              ),
            }}
            src="https://images.unsplash.com/photo-1517485883175-4ae93081b334?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
            alt=""
          />
        </Img>
      </Section>
    </>
  );
};

export default Services;

const Section = styled.section`
  width: 100vw;

  background: white;
`;

const Img = styled(animated.div)`
  position: relative;
  width: 100%;
  height: 40vw;
  overflow: hidden;

  box-shadow: inset 2px 2px 15px black;

  img {
    box-shadow: inset 2px 2px 15px black;
    width: 100%;
    transform: scale(2);
  }
`;
