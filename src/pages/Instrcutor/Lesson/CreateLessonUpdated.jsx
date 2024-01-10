import React, { useState } from "react";
import PageBanner from "../../../components/global/PageBanner";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import axios from "axios";
import RichTextEditor from "@mantine/rte";
const initialValue =
  "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";

import TailwindLoader from "../../../utils/tailwindLoader";
import Swal from "sweetalert2";
import controls from "../../../utils/controls";
import { URL } from "../../../constants";
function CreateLessonComponentUpdated() {
  const { courseId } = useParams();
  const [cookies] = useCookies([]);
  const languageState = useSelector((state) => state.language);
  const userState = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [language, setLang] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [docs, setDocs] = useState([
    {
      lang: "",
      file: null,
    },
  ]);

  const addDocument = () => {
    const newDoc = {
      lang: "",
      file: null,
    };
    setDocs([...docs, newDoc]);
  };

  const removeDocument = (index) => {
    const updatedDocs = [...docs];
    updatedDocs.splice(index, 1);
    setDocs(updatedDocs);
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
  const [content, setContent] = useState(initialValue);
  const handleLanguageChange = (index, selectedLanguage) => {
    const updatedDocs = [...docs];
    updatedDocs[index].lang = selectedLanguage;
    setDocs(updatedDocs);
  };

  const handleImageUpload = (file) =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("image", file);
      fetch(
        "https://api.imgbb.com/1/upload?key=7d6fe25732d9424703dff4599bc89707",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((result) => resolve(result.data.url))
        .catch(() => reject(new Error("Upload failed")));
    });

  const handleFileChange = (index, event) => {
    const updatedDocs = [...docs];
    // console.log("triggered", event.target.files[0]);
    const file = event.target.files[0];
    updatedDocs[index].file = file;
    // console.log(file);
    setDocs(updatedDocs);
  };

  const [data, setData] = useState({
    lessonName: "Introduction to Programming",
    number: 1,
    courseId: courseId, // Replace with a valid Course Id
    status: "ACTIVE",
    time: "45 minutes",
    language: "en",
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Translator
      from="en"
      to={languageState?.language?.value}
      googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
    >
      <div className="faq-area">
        <div className="container">
          <form
            className="row"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);

              // const URL = "http://localhost:4000";
              // const URL = "https://united-eldt-01b5f6f6813b.herokuapp.com";

              try {
                // Send the FormData to the server

                const formData = new FormData();

                formData.append("courseId", courseId);
                formData.append("content", content);
                formData.append("number", data.number);
                formData.append("time", data.time);
                formData.append("lessonName", data.lessonName);
                formData.append("lessonName", data.language);

                const response = await axios.post(
                  `${URL}/teacher/createLesson/v2`,
                  formData, // Use formData here
                  {
                    headers: {
                      Authorization: `Bearer ${cookies.user}`, // You may need to adjust the token retrieval
                      "Content-Type": "multipart/form-data", // Use "multipart/form-data" for formData
                    },
                  }
                );

                setLoading(true);
                // Handle the response (e.g., show success message, redirect, etc.)
                const apiResult = response.data;
                if (apiResult.success) {
                  Swal.fire("Lesson created successfully");
                }
              } catch (error) {
                setLoading(true);
                Swal.fire("Error", error.response.data, "error");

                console.error("Error:", error);
              }
              setLoading(false);
            }}
          >
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label fw-semibold">Lesson Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Lesson Title"
                  name="lessonName"
                  style={{ color: "black" }}
                  value={data.lessonName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label fw-semibold">Lesson Number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="1"
                  min={1}
                  max={20}
                  name="number"
                  style={{ color: "black" }}
                  value={data.number}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label fw-semibold">Lesson Time </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="45 mins"
                  name="time"
                  style={{ color: "black" }}
                  value={data.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label fw-semibold">Language</label>
                <select
                  required
                  className="form-control"
                  name="language"
                  value={data.language}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a Language
                  </option>
                  {availableLanguages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* <div className="tw-flex tw-justify-center">
              <button className="default-btn" onClick={addDocument}>
                Add Document
              </button>
            </div>
             */}
            <div className="form-group">
              <label className="form-label fw-semibold">Lesson Data</label>
              <RichTextEditor
                // onImageUpload={handleImageUpload}
                // controls={controls}
                // onImageUpload={}
                value={content}
                // onChange={(e) => {}}
                onChange={(e) => {
                  setContent(e);
                }}
              />
            </div>
            {/* {JSON.stringify(content)} */}

            {/* {docs.map((doc, index) => (
              <React.Fragment key={index}>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label fw-semibold">Language</label>
                    <select
                      required
                      className="form-control"
                      name="language"
                      value={doc.lang}
                      onChange={(e) =>
                        handleLanguageChange(index, e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select a Language
                      </option>
                      {availableLanguages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  
                </div>
              </React.Fragment>
            ))}
             */}

            <div className="tw-flex tw-justify-center">
              <button type="submit" className="default-btn">
                Save
              </button>
            </div>

            <div className="tw-flex tw-justify-center">
              {loading && <TailwindLoader />}
            </div>
          </form>
        </div>
      </div>
    </Translator>
  );
}

export default function CreateLessonUpdated() {
  const { courseId } = useParams();

  return (
    <>
      <PageBanner
        pageTitle="Create a Lesson"
        homePageUrl="/"
        homePageText="Home"
        secondLevelText={"Course"}
        secondLinks={"/course/" + courseId}
        activePageText="Lesson"
      />
      <CreateLessonComponentUpdated />
    </>
  );
}
