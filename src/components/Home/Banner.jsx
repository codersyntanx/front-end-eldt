import React from "react";
import { styled } from "@mui/material/styles";

import { Translator, Translate } from "react-auto-translate";
import LeftHeroContent from "./LeftHeroContent";
import { useSelector } from "react-redux";
// import useHero1 from './Hero1/useHero1';
import heroimg from "./images/Group 1171278588.png"
const HeroBanner = styled("div")({
  display: `flex`,
  position: `relative`,
  flexDirection: `row`,
  width: `100%`,
  height: `fit-content`,
  backgroundColor: `#2C292A`,
  justifyContent: `center`,
  alignItems: `stretch`,
  alignContent: `stretch`,
  boxSizing: `border-box`,
  flexWrap: "wrap",
  flex: `1`,
});

const Hero = styled("div")({
  display: `flex`,
  position: `relative`,
  flexDirection: `row`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  flex: `1`,
  margin: `0px`,
  flexWrap: "wrap",
});

const DivHeroLeft = styled("div")({
  display: `flex`,
  position: `relative`,
  flexDirection: `column`,
  justifyContent: "stretch",
  alignItems: `stretch`,
  padding: `30px`,
  boxSizing: `border-box`,
  flex: `1`,
  margin: `0px`,
  flexWrap: "wrap",
});

const LeftHeroContentDiv = styled(LeftHeroContent)(({ theme }) => ({
  margin: `0px`,
  width: `100%`,
  height: `fit-content`,
  flexWrap: "wrap",
}));

const DivHeroRight = styled("div")({
  display: `flex`,
  position: `relative`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,
  paddingBottom: `50px`,
  boxSizing: `border-box`,
  flex: `1`,
  width: `inherit`,
  flexWrap: "wrap",
  height: `calc(100vh - 100px)`,
});

const DivHeroRightContent = styled("div")({
  display: `flex`,
  position: `relative`,
  flexDirection: `row`,
  justifyContent: `space-between`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  flex: `1`,
  width: `100%`,
  height: `100vh`,
  flexWrap: "wrap",
});

function Banner(...props) {
  const languageState = useSelector((state) => state.language);

  return (
    <Translator
      from="en"
      to={props.language || languageState.language.value || "en"}
      googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
    >
      <HeroBanner className={`hero-banner  tw-px-5 ${props.className}`}>
        <Hero className="container main-block ">
          <DivHeroLeft className="main-left-content">
            <LeftHeroContentDiv language={props.language} />
          </DivHeroLeft>
          <DivHeroRight className="main-right-content">
            <DivHeroRightContent>
              <div className="main-image desktop">
                <img src={heroimg}  alt="" />
              </div>
              <div className="main-image mobile">
                <img src={heroimg} alt="" />
              </div>
            </DivHeroRightContent>
          </DivHeroRight>
        </Hero>
      </HeroBanner>
    </Translator>
  );
}

export default Banner;
