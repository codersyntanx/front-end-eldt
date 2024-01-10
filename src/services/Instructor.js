// const URL = "http://localhost:4000";
// const URL = "https://united-eldt-01b5f6f6813b.herokuapp.com";

import axios from "axios";
import { URL } from "../constants";

export const loginInstructor = async (email, password) => {
  try {
    const result = await axios.post(`${URL}/teacher/login`, {
      email,
      password,
    });

    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const createCourse = async (
  {
    learningType,
    whatYouWillLearn,
    requirements,
    courseIsFor,
    description,
    createdBy,
    creatorName,
    name,
    price,
    image,
    status,
    assets,
    duration,
    accessTime,
    overview,
  },
  token
) => {
  try {
    const result = await axios.post(
      `${URL}/teacher/createCourse`,
      {
        category: learningType,
        whatYouWillLearn,
        requirements,
        courseIsFor,
        description,
        createdBy,
        creatorName,
        name,
        price,
        image,
        status,
        assets,
        duration,
        accessTime,
        overview,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const editCourse = async (
  {
    courseId,
    learningType,
    whatYouWillLearn,
    requirements,
    courseIsFor,
    description,
    createdBy,
    creatorName,
    name,
    price,
    image,
    status,
    assets,
    duration,
    accessTime,
    overview,
  },
  token
) => {
  try {
    const result = await axios.put(
      `${URL}/teacher/editCourse`,
      {
        courseId,
        category: learningType,
        whatYouWillLearn,
        requirements,
        courseIsFor,
        description,
        createdBy,
        creatorName,
        name,
        price,
        image,
        status,
        assets,
        duration,
        accessTime,
        overview,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const createInstructor = async (name, email, password) => {
  try {
    const result = await axios.post(`${URL}/teacher/createAccount`, {
      email,
      password,
      name,
    });
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const verifyInstructorAccount = async (name, email, token) => {
  try {
    const result = await axios.post(`${URL}/teacher/verifyAccount`, {
      token,
      email,
      name,
    });
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};
//

//
export const getLessonByIdForIns = async (lessonId, token) => {
  try {
    const result = await axios.get(`${URL}/teacher/lesson/${lessonId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const getMyCourses = async (insId, token) => {
  try {
    const result = await axios.post(
      `${URL}/teacher/courses`,
      { teacherId: insId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};
export const getCourseLessons = async (courseId, token, language = "en") => {
  try {
    const result = await axios.get(
      `${URL}/teacher/course/lesson/${courseId}?language=${language}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const getCourseByIdForIns = async (courseId, token) => {
  try {
    const result = await axios.get(`${URL}/teacher/course/${courseId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const applyForApproval = async (courseId, token) => {
  try {
    const result = await axios.patch(
      `${URL}/teacher/course/status`,
      {
        courseId,
        status: "APPROVAL_REQUIRED",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const changeStatusToDraft = async (courseId, token) => {
  try {
    const result = await axios.get(
      `${URL}/teacher/course/status`,
      {
        courseId,
        status: "DRAFT",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const updateQuestions = async (lessonId, mcqs, token) => {
  try {
    const result = await axios.post(
      `${URL}/teacher/updateQuestions`,
      {
        lessonId,
        mcqs,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};
export const getQuestionsLessonId = async (lessonId, token) => {
  try {
    const result = await axios.post(
      `${URL}/teacher/lesson/quiz/fetch`,
      {
        lessonId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};
export const editLessonById = async (lessonId, lessonData, token) => {
  try {
    const result = await axios.post(
      `${URL}/teacher/editLesson`,
      {
        lessonId,
        lessonData,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

// /editCourse
// /createLesson
// /

export const activeCourse = async (courseId, token) => {
  try {
    const result = await axios.post(
      `${URL}/teacher/course/status`,
      {
        courseId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};
