import { below } from "@/styles/breakpoints";
import styled from "styled-components";
import { Gi3DHammer, Gi3DGlasses, GiAirplaneArrival } from "react-icons/gi";

const Services = () => {
  const services = [
    {
      title: "Service 1",
      tx: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae tincidunt turpis. Fusce posuere tempus orci, sit amet sollicitudin lectus ullamcorper eu. Duis malesuada ultrices mattis",
      icon: <GiAirplaneArrival />,
    },
    {
      title: "Service 2",
      tx: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae tincidunt turpis. Fusce posuere tempus orci, sit amet sollicitudin lectus ullamcorper eu. Duis malesuada ultrices mattis",
      icon: <Gi3DGlasses />,
    },
    {
      title: "Service 3",
      tx: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae tincidunt turpis. Fusce posuere tempus orci, sit amet sollicitudin lectus ullamcorper eu. Duis malesuada ultrices mattis",
      icon: <Gi3DHammer />,
    },
  ];

  return (
    <>
      <Section>
        <h2
          style={{ width: "fit-content", height: "100px", margin: "20px auto" }}
        >
          SERVICES
        </h2>
        <Wrap>
          {services.map(({ title, tx, icon }, i) => (
            <Card>
              <h3>{title}</h3>
              <p>{tx}</p>
              <div
                style={{
                  width: "fit-content",
                  margin: "0px auto",
                  fontSize: "55px",
                }}
              >
                {icon}
              </div>
            </Card>
          ))}
        </Wrap>
      </Section>
    </>
  );
};

export default Services;

const Section = styled.section`
  width: 100vw;
  /* min-height: 100vh; */
  padding: 100px 10px;

  background: hsla(35, 25%, 75%, 1);
  font-family: Montserrat;
  color: white;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 43%;
  flex: 0 1 300px;
  margin: 10px;
  padding: 20px 0px;

  ${below.med`
    width: 100%;
  `};

  background: white;
  color: hsla(35, 25%, 75%, 1);
  border-radius: 5px;
  box-shadow: 2px 2px 10px hsla(15, 35%, 35%, 0.3);

  h3,
  p {
    font-weight: 200;
    margin: 10px 10px 20px;
  }

  h3 {
    text-align: center;
  }
`;
