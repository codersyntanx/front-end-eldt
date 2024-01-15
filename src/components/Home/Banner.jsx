import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import { Translator, Translate } from "react-auto-translate";
import LeftHeroContent from "./LeftHeroContent";
import { useSelector } from "react-redux";
// import useHero1 from './Hero1/useHero1';
import heroimg from "./images/Group 1171278588.png"
import heroimg2 from "./Group 117127858823.png"

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
  // justifyContent: `center`,
  // alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  flex: `1`,
  margin: `0px`,
  flexWrap: "nowrap",
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
  flexWrap: "nowrap",
  // height: `auto`,
});
const MainImage = styled("img")(({ theme }) => ({
  width: "80%", 

  [theme.breakpoints.up("xl")]: {
    width: "100%", // Set to 100% width for extra-large screens (xl and above)
  },
}));


const DivHeroRightContent = styled("div")({
  display: `flex`,
  position: `relative`,
  flexDirection: `row`,
  justifyContent: `space-between`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  flex: `1`,
  width: `974px`,
  flexWrap: "wrap",
  
});

function Banner(...props) {
  const languageState = useSelector((state) => state.language);
  const [largeScreenImage, setLargeScreenImage] = useState(heroimg);

  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is greater than or equal to 1440 pixels
      const newImage = window.innerWidth <= 1440 ? heroimg2 : heroimg;
      setLargeScreenImage(newImage);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize on component mount
    handleResize();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
          <DivHeroRight className="rightimagecontent">
            <DivHeroRightContent imgcontent>
            <DivHeroRightContent imgcontent>
              <MainImage src={largeScreenImage} alt="" className="main-image desktop largescreenhero" />
            </DivHeroRightContent>
            </DivHeroRightContent>
            <div className="maincover">
              <div className="main-image mobile">
                <img src={heroimg} alt="" />
              </div>
            </div>
          </DivHeroRight>
        </Hero>
      </HeroBanner>
    </Translator>
  );
}

export default Banner;
