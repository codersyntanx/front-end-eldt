import React, { useState } from "react";
import PageBanner from "../../components/global/PageBanner";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";
import GeneralLoader from "../../utils/generalLoader";

const ProfileComponent = () => {
  const languageState = useSelector((state) => state.language);

  const [userUpdate, setUserUpdate] = useState();
  const [social, setSocial] = useState({
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState();
  const [profilePreview, setProfilePreview] = useState("");
  const handleProfilePhotoUpload = async () => {
    // console.log(avatar);
    const data = new FormData();
    data.append("file", avatar?.profile_photo);
    // data.append("upload_preset", process.env.UPLOAD_PRESETS);
    // data.append("cloud_name", process.env.CLOUD_NAME);

    // let response;
    // if (avatar) {
    // 	response = await axios.post(process.env.CLOUDINARY_URL, data);
    // }
    // const profilePhotoUrl = response.data.url;
    // return profilePhotoUrl;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserUpdate((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocial((prevState) => ({ ...prevState, [name]: value }));
  };

  const availableLanguages = [
    { name: "English", value: "en", className: "flag-icon-us" },
    { name: "Spanish", value: "es", className: "flag-icon-es" },
    { name: "Arabic", value: "ar", className: "flag-icon-arab" },
    { name: "Russian", value: "ru", className: "flag-icon-ru" },
    { name: "Hindi", value: "hi", className: "flag-icon-hindi" },
    { name: "French", value: "fr", className: "flag-icon-fr" },
    { name: "Urdu", value: "ur", className: "flag-icon-ur" },
    { name: "Portuguese", value: "pt", className: "flag-icon-pt" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChangePhoto = (e) => {
    const { files } = e.target;

    const profilePhotoSize = files[0].size / 1024 / 1024;
    if (profilePhotoSize > 2) {
      // toast.error(
      //   "The profile photo size greater than 2 MB. Make sure less than 2 MB.",
      //   {
      //     style: {
      //       border: "1px solid #ff0033",
      //       padding: "16px",
      //       color: "#ff0033",
      //     },
      //     iconTheme: {
      //       primary: "#ff0033",
      //       secondary: "#FFFAEE",
      //     },
      //   }
      // );
      e.target.value = null;
      return;
    }

    setAvatar({
      profile_photo: files[0],
    });
    setProfilePreview(window.URL.createObjectURL(files[0]));
  };

  return (
    <>
      <Translator
        from="en"
        to={languageState?.language?.value || "en"}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <form onSubmit={handleSubmit}>
          <div className="content-information">
            <div className="left-side">
              <div className="item-form item-file">
                <div className="image-block">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      className="img-thumbnail mw-200px"
                    />
                  ) : (
                    <img
                      src="/images/avatar.jpg"
                      alt="image"
                      className="img-thumbnail mw-200px"
                    />
                  )}
                </div>
                <label className="form-label fw-semibold label-file">
                  <span>Profile Image</span>
                  <input
                    type="file"
                    className="form-control file-control"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={handleChangePhoto}
                    required={true}
                  />
                  <span className="custom-file-button">
                    <Translate>Upload the Photo</Translate>
                  </span>

                  <div className="form-text mt-2">
                    Upload image size 200x200 pixels!
                  </div>
                </label>
              </div>

              <div className="item-form">
                <label className="form-label fw-semibold">
                  <Translate>First Name</Translate>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={userUpdate?.first_name}
                  onChange={handleChange}
                />
              </div>

              <div className="item-form">
                <label className="form-label fw-semibold">
                  <Translate>Last Name</Translate>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  value={userUpdate?.last_name}
                  onChange={handleChange}
                />
              </div>

              <div className="item-form">
                <label className="form-label fw-semibold">
                  <Translate>Biography</Translate>
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  name="bio"
                  value={userUpdate?.bio || "Some Words About You"}
                  onChange={handleChange}
                  rows="4"
                />
                <p className="form-text mt-2">
                  <Translate>
                    Your biography should have at least 50 characters, links and
                    coupon codes are not permitted.
                  </Translate>
                </p>
              </div>

              <div className="item-form" name="gender">
                <label className="form-label fw-semibold">
                  <Translate>Gender</Translate>
                </label>
                <select className="form-select">
                  <option defaultValue="Male">
                    <Translate>Male</Translate>
                  </option>
                  <option defaultValue="Female">
                    <Translate>Female</Translate>
                  </option>
                </select>
              </div>
              <div className="item-form" name="language">
                <label className="form-label fw-semibold">
                  <Translate>Language</Translate>
                </label>
                <select className="form-select">
                  {availableLanguages.map((lang, index) => (
                    <option value={lang.value} key={index}>
                      <Translate>{lang.name}</Translate>
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="right-side">
              <div className="item-form">
                <span className="social-title">
                  <Translate>Add your social networks</Translate>
                </span>
              </div>
              <div className="item-form">
                <label className="form-label fw-semibold">
                  <Translate>Website URL</Translate>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="websiteURL"
                  placeholder="http://www.example.com/"
                  name="website"
                  value={userUpdate?.website}
                  onChange={handleSocialChange}
                />
              </div>

              <div className="item-form">
                <label className="form-label fw-semibold">Twitter</label>
                <input
                  type="text"
                  className="form-control"
                  name="twitter"
                  value={social.twitter}
                  onChange={handleSocialChange}
                  placeholder="http://www.twitter.com/"
                />
              </div>

              <div className="item-form">
                <label className="form-label fw-semibold">Facebook</label>
                <input
                  type="text"
                  className="form-control"
                  name="facebook"
                  value={social.facebook}
                  onChange={handleSocialChange}
                  placeholder="http://www.facebook.com/"
                />
              </div>

              <div className="item-form">
                <label className="form-label fw-semibold">Linkedin</label>
                <input
                  type="text"
                  className="form-control"
                  name="linkedin"
                  value={social.linkedin}
                  onChange={handleSocialChange}
                  placeholder="http://www.linkedin.com/"
                />
              </div>

              <div className="item-form">
                <label className="form-label fw-semibold">Youtube</label>
                <input
                  type="text"
                  className="form-control"
                  name="youtube"
                  value={social.youtube}
                  onChange={handleSocialChange}
                  placeholder="http://www.youtube.com/"
                />
              </div>
            </div>
          </div>

          <div className="button-save-bottom ">
            <button type="submit" className="btn default-btn">
              <Translate>Save Changes</Translate>{" "}
            </button>
          </div>
          {loading ? <GeneralLoader /> : ""}
        </form>
      </Translator>
    </>
  );
};

export default function Profile() {
  return (
    <>
      <PageBanner
        pageTitle="Student Profile"
        homePageUrl="/student/dashboard"
        homePageText="Home"
        activePageText="Student Profile"
      />
      <div className="basic-info">
        <div className="container">
          <div className="basic-profile-information-form">
            <ProfileComponent />
          </div>
        </div>
      </div>
    </>
  );
}
