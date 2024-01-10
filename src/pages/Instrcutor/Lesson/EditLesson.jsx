import React, { useEffect, useState } from "react";
import RichTextEditor from "@mantine/rte";
import controls from "../../../utils/controls";

import PageBanner from "../../../components/global/PageBanner";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import TailwindLoader from "../../../utils/tailwindLoader";
import Swal from "sweetalert2";
import { getLessonByIdForIns } from "../../../services/Instructor";
import { URL } from "../../../constants";

const EditLessonHeader = ({ url, lessonId }) => {
  const languageState = useSelector((state) => state.language);

  const arrayLinks = [
    {
      title: "Edit Lesson",
      link: "/instructor/course/lesson/edit/" + lessonId,
    },
    {
      title: "Edit Quiz",
      link: "/instructor/course/lesson/mcq/edit/" + lessonId,
    },
    // {
    //   title: "Create a Lesson",
    //   link: "/instructor/course/lesson/create",
    // },
  ];

  return (
    <>
      <ul className="account-header">
        {arrayLinks.map((item) => (
          <li>
            <Link to={item.link}>
              <a className={`${item.link == url ? "active" : ""}`}>
                <Translate>{item.title}</Translate>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

function EditLessonComponent() {
  const { lessonId } = useParams();
  const [cookies] = useCookies([]);
  const languageState = useSelector((state) => state.language);
  const userState = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [language, setLang] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [prevDocs, setPrevDocs] = useState([]);
  const [content, setContent] = useState("");

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

  const fetchLesson = async () => {
    setLoading(true);
    const apiResult = await getLessonByIdForIns(lessonId, cookies.user);
    if (apiResult.success) {
      // console.log(apiResult.lesson);
      // setData()
      const mainContent = await axios.get(`${apiResult.lesson?.content}`);

      setContent(mainContent.data);
      setLoading(false);
      setData({
        ...data,
        time: apiResult.lesson.time,
        lessonName: apiResult.lesson.lessonName,
        number: apiResult.lesson.number,
      });
      setPrevDocs(apiResult.lesson.document);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchLesson();
  }, []);
  const [docs, setDocs] = useState([]);

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

  const removeDocumentFromPrev = (index) => {
    const updatedDocs = [...prevDocs];
    updatedDocs.splice(index, 1);
    setPrevDocs(updatedDocs);
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

  const handleLanguageChange = (index, selectedLanguage) => {
    const updatedDocs = [...docs];
    updatedDocs[index].lang = selectedLanguage;
    setDocs(updatedDocs);
  };

  const handleFileChange = (index, event) => {
    const updatedDocs = [...docs];
    // console.log("triggered", event.target.files[0]);
    const file = event.target.files[0];
    updatedDocs[index].file = file;
    // console.log(file);
    setDocs(updatedDocs);
  };

  const [data, setData] = useState({
    _id: lessonId,
    lessonId: lessonId,
    lessonName: "Introduction to Programming",
    number: 1,
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
              const formData = new FormData();

              // Append lesson data to FormData
              for (const key in data) {
                formData.append(key, data[key]);
              }

              formData.append("content", content);

              // formData.append("prevDocs", JSON.stringify(prevDocs));
              // Append language and file data to FormData
              // docs.forEach((doc, index) => {
              //   formData.append(`language_${index}`, doc.lang);
              //   if (doc.file) {
              //     formData.append(`file_${index}`, doc.file);
              //   }
              // });

              // const URL = "http://localhost:4000";
              // const URL = "https://united-eldt-01b5f6f6813b.herokuapp.com";

              try {
                // Send the FormData to the server
                const response = await axios.post(
                  `${URL}/teacher/editLesson/v2`,
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${cookies.user}`, // You may need to adjust the token retrieval
                      "Content-Type": "multipart/form-data", // Make sure to set the correct content type
                    },
                  }
                );
                setLoading(true);

                // Handle the response (e.g., show success message, redirect, etc.)
                const apiResult = response.data;
                if (apiResult.success) {
                  Swal.fire("Success", "Lesson Edited successfully", "success");
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
                <label className="form-label fw-semibold">Lesson Time</label>
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

            {/* {prevDocs.map((doc, index) => (
              <React.Fragment key={index}>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label fw-semibold">Language</label>
                    <select
                      required
                      className="form-control"
                      name="language"
                      value={doc?.lang}
                      disabled
                      onChange={(e) =>
                        handleLanguageChange(index, e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select a Language
                      </option>
                      {
                        <option key={doc.lang} value={doc.lang}>
                          {doc.lang}
                        </option>
                      }
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="tw-flex tw-justify-center tw-align-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="tw-w-10 tw-h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  </div>
                  <span className="tw-text-center">{doc.documentName}</span>
                  <div className="tw-block">
                    <button onClick={() => removeDocumentFromPrev(index)}>
                      Remove Document
                    </button>
                  </div>
                </div>{" "}
              </React.Fragment>
            ))}
            {docs.map((doc, index) => (
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
                  <div className="form-group">
                    <label className="form-label fw-semibold">
                      Upload Document
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      className="form-control"
                      name="document"
                      onChange={(e) => handleFileChange(index, e)}
                      required
                    />
                    <button onClick={() => removeDocument(index)}>
                      Remove Document
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))} */}

            <div className="form-group">
              <label className="form-label fw-semibold">Lesson Data</label>
              <RichTextEditor
                // onImageUpload={handleImageUpload}
                // controls={controls}
                value={content}
                onChange={(e) => {
                  setContent(e);
                }}
              />
            </div>

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

export default function EditLesson() {
  const { lessonId } = useParams();
  return (
    <>
      <PageBanner
        pageTitle="Edit a Lesson"
        homePageUrl="/"
        homePageText="Home"
        secondLevelText={"Courses"}
        secondLinks={"/courses/"}
        activePageText="Lesson"
      />
      <div className="create-course">
        <div className="container">
          <EditLessonHeader
            url="/instructor/course/create/"
            lessonId={lessonId}
          />
          <div className="create-course-form">
            <EditLessonComponent lessonId={lessonId} />
          </div>
        </div>
      </div>
    </>
  );
}
