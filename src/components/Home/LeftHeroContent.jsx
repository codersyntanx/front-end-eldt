import React from "react";
import { styled } from "@mui/material/styles";

import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import allfalg from "./images/Frame 6707.png"
const LeftHeroContent1 = styled("div")({});
const Frame6818 = styled("div")({});
const ObtenhaCertificaçãoDSpan1 = styled("span")({});
const ObtenhaCertificaçãoDSpan2 = styled("span")({});
const ObtenhaCertificaçãoDSpan3 = styled("span")({});
const ObtenhaCertificaçãoD = styled("h1")({});
const SomosAMaiorCertifica = styled("span")({});
const DivFrame6707 = styled("div")({});


const Ellipse15 = styled("img")({
  height: `41px`,
  width: `41px`,
  margin: `-2px`,
  position: "relative",
  border:"3px solid #2c292a",
 borderRadius:"50%",
 padding:"0px"
});

const Ellipse16 = styled("img")({
  height: `41px`,
  width: `41px`,
  margin: `-2px`,
  position: "relative",
  border:"3px solid #2c292a",
 borderRadius:"50%",
 padding:"0px"
});

const Ellipse17 = styled("img")({
  height: `41px`,
  width: `41px`,
  margin: `-2px`,
  position: "relative",
  border:"2px solid #2c292a",
 borderRadius:"50%",
 padding:"0px"

});

const Ellipse18 = styled("img")({
  height: `41px`,
  width: `41px`,
  margin: `-2px`,
  position: "relative",
  border:"2px solid #2c292a",
 borderRadius:"50%",
 padding:"0px"

});

const Ellipse19 = styled("img")({
  height: `41px`,
  width: `41px`,
  margin: `-2px`,
  position: "relative",
  border:"2px solid #2c292a",
 borderRadius:"50%",
 padding:"0px"
});

const Ellipse20 = styled("img")({
  height: `41px`,
  width: `41px`,
  margin: `-2px`,
  position: "relative",
});

const Ellipse21 = styled("img")({
  height: `41px`,
  width: `41px`,
  position: "relative",
  margin: `-2px`,
});

const DivFrame3830 = styled("div")({
  display: `flex`,
  position: `relative`,
  flexDirection: `row`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  alignSelf: `stretch`,
  margin: `0px 0px 0px 0px`,
  width: "-webkit-fill-available",
  flexWrap: "wrap",
});

const DivFrame3 = styled("div")({});

const DivButtons = styled("div")(({ theme }) => ({}));

const ComprarAgora = styled("div")(({ theme }) => ({}));

const DivButtons2 = styled("div")({});

const FaleConosco = styled("div")(({ theme }) => ({}));

const DivAPlataformaPossui = styled("div")({
  display: `flex`,
  position: `relative`,

  flexDirection: `column`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `0px`,
  boxSizing: `border-box`,
  alignSelf: `stretch`,
  flex: `1`,
  margin: `10px 0px 0px 0px`,
});

const Frame6816 = styled("div")({
  display: `flex`,
  position: `relative`,
  flexDirection: `column`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `0px`,
  boxSizing: `border-box`,
  flex: `1`,
  height: `32.5px`,
  margin: `0px`,
});

const SealFmcsa1Png = styled("div")({
  backgroundImage: `url(images/seal.png)`,
  backgroundPosition: `center`,
  backgroundSize: `contain`,
  backgroundRepeat: `no-repeat`,
  width: "92px",
  height: "92px",
});

const APlataformaPossuiInt = styled("div")(({ theme }) => ({}));

function LeftHeroContent(...props) {
  const languageState = useSelector((state) => state.language);
  const handleClick = () => {
    const screenWidth = window.innerWidth;
    if(screenWidth >=786){
       window.scrollTo({
        top: window.scrollY + 1000,
        behavior: "smooth", });
    }else{
      window.scrollTo({
        top: window.scrollY + 1150,
        behavior: "smooth", });
    }
     
    
 
  };
  return (
    <Translator
      from="en"
      to={props.language || languageState.language.value || "en"}
      googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
    >
      <LeftHeroContent1 className={`left-hero-block ${props.className}`}>
        <Frame6818>
          <ObtenhaCertificaçãoD className="main-title-hero herosectionhead">
              <Translate>{`Get`}</Translate>
           &nbsp;
              <span className="yellow">
                <Translate>{`certified`}</Translate>
              </span>
              &nbsp;

              <Translate>{`from anywhere!`}</Translate>
          </ObtenhaCertificaçãoD>
          <SomosAMaiorCertifica className="main-subtitle" style={{maxWidth:"527px"}} >
            <Translate>
              {`We are the largest CDL ELDT certified and digital platform in 8 languages in United States`}
            </Translate>
          </SomosAMaiorCertifica>
        </Frame6818>

        <DivFrame6707 className="line-flag" style={{ display: "flex",marginBottom:"48px" }}>
          <img
            src={allfalg}
            loading="lazy"
            alt={"us-black"}
          />
        
        </DivFrame6707>
        <DivFrame3830>
          <DivFrame3 className="main-block-buttons">
            <ComprarAgora className="buy-now">
              <Link to="" onClick={handleClick}>
                <Translate>{`Buy Now`}</Translate>
              </Link>
            </ComprarAgora>
            <FaleConosco className="contact-us">
            <Link to="/contact-us" >
            <Translate>{`Contact Us`}</Translate>
          </Link>
            </FaleConosco>
          </DivFrame3>
        </DivFrame3830>
       
        
      </LeftHeroContent1>
    </Translator>
  );
}

export default LeftHeroContent;
