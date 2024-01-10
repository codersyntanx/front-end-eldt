import React, { useEffect, useState } from "react";
import PageBanner from "../../../../components/global/PageBanner";
import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import {
  getQuestionsLessonId,
  updateQuestions,
} from "../../../../services/Instructor";
import Swal from "sweetalert2";
import TailwindLoader from "../../../../utils/tailwindLoader";

function EditQuizComponent() {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [cookies] = useCookies([]);
  const languageState = useSelector((state) => state.language);
  const userState = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [mcqs, setMCQs] = useState([]);
  const updateQuestionsList = async () => {
    setLoading(true);

    // alert("going for the update");
    // alert(JSON.stringify(mcqs));
    const result = await updateQuestions(lessonId, mcqs, cookies.user);
    if (result?.success) {
      Swal.fire({
        title: "Lesson Updated",
        text: "Lesson questions has been updated",
      });
    } else {
      if (result.message === "Token is not valid for User") {
        Swal.fire({
          title: "Session Expired",
          text: "User Session has been expired please login again",
        });

        dispatch(LogoutUser());
        navigate("/");
        return;
      }
      Swal.fire("Error In Updating Questions", result.message);
    }
    setLoading(false);
  };
  const getQuestions = async () => {
    setLoading(true);
    const result = await getQuestionsLessonId(lessonId, cookies.user);
    if (result.success) {
      // alert(());
      setLoading(false);

      setMCQs(result.mcqs);
    }
  };
  useEffect(() => {
    getQuestions();
  }, []);
  const addMCQ = () => {
    const newMCQ = {
      question: "",
      options: [
        { key: "a", value: "" },
        { key: "b", value: "" },
        { key: "c", value: "" },
        { key: "d", value: "" },
      ],
      answer: "a", // Default answer
    };
    setMCQs([...mcqs, newMCQ]);
  };
  const handleQuestionChange = (index, question) => {
    const updatedMCQs = [...mcqs];
    updatedMCQs[index].question = question;
    setMCQs(updatedMCQs);
  };

  const handleOptionChange = (mcqIndex, optionIndex, optionValue) => {
    const updatedMCQs = [...mcqs];
    updatedMCQs[mcqIndex].options[optionIndex].value = optionValue;
    setMCQs(updatedMCQs);
  };

  const handleAnswerChange = (mcqIndex, answer) => {
    const updatedMCQs = [...mcqs];
    updatedMCQs[mcqIndex].answer = answer;
    setMCQs(updatedMCQs);
  };
  const removeMCQ = (mcqIndex) => {
    const updatedMCQs = [...mcqs];
    updatedMCQs.splice(mcqIndex, 1);
    setMCQs(updatedMCQs);
  };

  return (
    <>
      <Translator
        from="en"
        to={languageState?.language?.value}
        googleApiKey={import.meta.env.VITE_GOOGLE_TRANSLATE_KEY}
      >
        <div className="faq-area">
          <div className="container">
            <div className="row">
              {mcqs.length == 0 && (
                <div className="tw-text-center tw-text-3xl tw-my-5">
                  No Questions Added Yet
                </div>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateQuestionsList();
                }}
              >
                {mcqs.map((mcq, mcqIndex) => (
                  <div key={mcqIndex} className="form-group">
                    <div>
                      <label className="tw-my-1 tw-font-bold">
                        {" "}
                        Question: {mcqIndex + 1}
                      </label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Question"
                        value={mcq.question || ""}
                        onChange={(e) =>
                          handleQuestionChange(mcqIndex, e.target.value)
                        }
                      />
                      {/* <div className="tw-flex tw-justify-between">
                        <button
                          className="default-btn tw-bg-red-600 tw-text-white"
                          onClick={() => removeMCQ(mcqIndex)}
                        >
                          Remove Question
                        </button>
                      </div> */}
                    </div>
                    <div className="row">
                      {mcq.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="col-md-6">
                          <div className="tw-flex tw-space-x-1 tw-my-2 tw-items-center">
                            <label className="tw-my-2">{option.key}:</label>
                            <input
                              required
                              className="form-control"
                              type="text"
                              value={option.value}
                              onChange={(e) =>
                                handleOptionChange(
                                  mcqIndex,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="col-md-6">
                      <label>Correct Answer:</label>
                      <select
                        required
                        className="form-select"
                        value={mcq.answer}
                        onChange={(e) =>
                          handleAnswerChange(mcqIndex, e.target.value)
                        }
                      >
                        {mcq.options.map((option, optionIndex) => (
                          <option key={optionIndex} value={option.key}>
                            {option.key}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                <div className="tw-flex tw-justify-center">
                  <button className="default-btn" onClick={addMCQ}>
                    Add MCQ
                  </button>
                </div>
                <div className="tw-flex tw-justify-center tw-my-3">
                  <button type="submit" className="default-btn">
                    Save Questions
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          {loading && (
            <div className="tw-flex tw-justify-center tw-p-10">
              <TailwindLoader></TailwindLoader>
            </div>
          )}
        </div>
      </Translator>
    </>
  );
}

export default function EditQuiz() {
  return (
    <>
      <PageBanner
        pageTitle="Edit Quiz"
        homePageUrl="/"
        homePageText="Course"
        activePageText="Quiz"
      />
      <EditQuizComponent />
    </>
  );
}
