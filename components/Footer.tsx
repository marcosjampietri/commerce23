import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiVideo,
  FiVoicemail,
} from "react-icons/fi";

import { BsWhatsapp } from "react-icons/bs";

import { below } from "../styles/breakpoints";
{
  /* import { Reveal } from "../reveal"; */
}

const Footer = () => {
  const contacts = [
    {
      icon: <FiMapPin />,
      tx: "Camden Town, London, UK",
      path: "",
    },
    {
      icon: <FiMail />,
      tx: "mgjampietri@hotmail.com",
      path: "mailto:mgjampietri@hotmail.com",
    },
    {
      icon: <BsWhatsapp style={{ fill: "hsla(35, 25%, 60%, 1)" }} />,
      tx: "+44 7541505202",
      path: "https://api.whatsapp.com/send?phone=447541505202&text=Hello! I'd like to have more ifformation about the service",
    },
  ];
  const socials = [
    {
      name: "facebook",
      icon: <FiFacebook />,
      path: "",
    },
    {
      name: "instagram",
      icon: <FiInstagram />,
      path: "",
    },
    {
      name: "linkdin",
      icon: <FiLinkedin />,
      path: "",
    },
  ];
  const pages = [
    {
      name: "Home",
      path: "",
    },
    {
      name: "About",
      path: "",
    },
    {
      name: "FAQs",
      path: "",
    },
    {
      name: "Blog",
      path: "",
    },
    {
      name: "Contact",
      path: "",
    },
  ];

  return (
    <Section id="Contact">
      <Margin>
        <Main>
          <Logo>
            {/* <Image src="/logo.svg" width="80" height="55" alt="logo" /> */}
            HANNAH LOGO
          </Logo>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <Social>
            {socials.map((social, i) => (
              <a key={i} href={social.path} target="_blank" rel="noreferrer">
                {social.icon}
              </a>
            ))}
          </Social>
        </Main>
        <Contacts>
          <h2 style={{ fontFamily: "Montserrat" }}>Contacts</h2>
          {contacts.map((contact, i) => (
            <Line key={i}>
              <div>{contact.icon}</div>
              <a href={contact.path}>{contact.tx} </a>
            </Line>
          ))}
        </Contacts>
        <Pages>
          <h2 style={{ fontFamily: "Montserrat" }}>Site Map</h2>
          {pages.map((page, i) => (
            <Line key={i}>
              <a href={page.path}>{page.name} </a>
            </Line>
          ))}
        </Pages>
      </Margin>
    </Section>
  );
};

export default Footer;

const Section = styled.footer`
  width: 100vw;
  padding: 50px 0px;

  background: hsla(0, 0%, 10%, 1);

  h2 {
    font-family: Montserrat;
  }

  display: flex;
`;

const Margin = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0px auto;
  padding: 0px 0px;

  display: flex;
  ${below.med`
    display: block;
    
         
       `};
`;

const List = styled.div`
  color: white;
  padding: 20px;

  h2 {
    font-family: Bebas Neue;
    letter-spacing: 2px;
    font-size: 25px;
    line-height: 1.5em;
    margin-bottom: 20px;
    white-space: nowrap;
  }
  h4 {
    padding: 0px 0px 25px 0px;
    font-size: 1.3em;
  }
  p {
    letter-spacing: 2px;
    line-height: 1.5em;
    font-weight: 100;
    margin-bottom: 25px;
  }
  a {
  }
`;
const Main = styled(List)`
  width: 45%;
`;
const Contacts = styled(List)`
  width: 35%;
`;
const Pages = styled(List)`
  width: 20%;
`;

const Line = styled.div`
  width: 100%;
  height: 30px;
  padding: 25px 0px;

  white-space: nowrap;

  svg {
    margin: 0 20px 0px 0px;
    width: 30px;
    height: 100%;
    stroke: hsla(35, 25%, 60%, 1);
  }

  display: flex;
  align-items: center;
`;
const Social = styled.div`
  max-width: 300px;
  min-width: 210px;
  padding: 12px 10px;
  border-top: 1px solid grey;

  display: flex;
  justify-content: space-between;

  a {
    border: 1px solid hsla(35, 25%, 35%, 1);
    border-radius: 50%;
    text-align: center;
    padding: 10px;
    margin-right: 10px;
    svg {
      width: 28px;
      height: 25px;
      stroke: hsla(35, 25%, 60%, 1);
    }
  }
`;

const Logo = styled.div`
  cursor: pointer;
  margin-bottom: 25px;
  .img {
    object-fit: cover;
  }
`;
