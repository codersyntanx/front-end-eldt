// const URL = "http://localhost:4000";
//
// const URL = "https://united-eldt-01b5f6f6813b.herokuapp.com";
import axios from "axios";
import { URL } from "../constants";

export const loginStudent = async (email, password) => {
  try {
    const result = await axios.post(`${URL}/student/login`, {
      email,
      password,
    });
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};
export const createStudent = async (name, email, password) => {
  try {
    const result = await axios.post(`${URL}/student/createAccount`, {
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

export const verifyStudentAccount = async (name, email, token) => {
  try {
    const result = await axios.post(`${URL}/student/verifyAccount`, {
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

export const getWishListOnly = async (studentId, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/wishlist/list`,
      { studentId },
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

export const getPurchasedListOnly = async (studentId, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/purchased/list`,
      { studentId },
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

export const getWishListCourses = async (studentId, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/courses/wishlist`,
      { studentId },
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

export const getPurchasedCoursesDetailed = async (studentId, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/courses/purchased`,
      { studentId },
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

export const getPurchasedCourses = async (studentId, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/courses/purchased/list`,
      { studentId },
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

export const getLessonQuiz = async (lessonId, courseId, studentId, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/lesson/quiz/${lessonId}`,
      { studentId, courseId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    // alert(JSON.stringify({ message: "error", error }));
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const getCompletedListCourses = async (studentId, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/courses/completed/list`,
      { studentId },
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

export const addToWish = async (courseId, studentId, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/wishlist/add`,
      { courseId, studentId },
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

export const removeFromWish = async (courseId, studentId, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/wishlist/remove`,
      {
        courseId,
        studentId,
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

export const enrollInCourse = async (courseId, studentId, language, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/enroll`,
      {
        courseId,
        studentId,
        language,
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

export const getCompletedCourses = async (studentId, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/courses/completed`,
      { studentId },
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

export const getEnrolledCourses = async (studentId, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/courses/enrolled`,
      { studentId },
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

export const completeCourse = async (courseId, studentId, language, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/complete`,
      {
        courseId,
        studentId,
        language,
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

export const getLessonsByCourseId = async (
  courseId,
  token,
  language = "en"
) => {
  try {
    const result = await axios.post(
      `${URL}/student/course/lesson?language=${language}`,
      { chapterId: courseId },
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

export const getMyInfo = async (studentId, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/getMyInfo`,
      { id: studentId },
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

export const getLessonByIdForStudent = async (lessonId, token) => {
  try {
    const result = await axios.get(`${URL}/student/lesson/:${lessonId}`, {
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

export const getLessonById = async (lessonId, token) => {
  try {
    const result = await axios.post(
      `${URL}/student//lesson/${lessonId}`,
      { chapterId },
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

export const attemptQuizMcq = async (
  lessonId,
  courseId,
  questionWithAnswer,
  studentId,
  token
) => {
  try {
    const result = await axios.post(
      `${URL}/student/attemptQuiz`,
      { lessonId, courseId, questionWithAnswer, studentId },
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
export const getLessonResults = async (courseId, studentId, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/course/results`,
      { courseId, studentId },
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

export const getMyResults = async (studentId, token) => {
  try {
    const result = await axios.post(
      `${URL}/student/myCourses/results`,
      { studentId },
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
