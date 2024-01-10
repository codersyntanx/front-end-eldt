import {
  ADD_TO_CART,
  ADD_TO_COMPLETED,
  ADD_TO_LIST,
  ADD_TO_PURCHASED,
  CLEAR_COMPLETED,
  CLEAR_PURCHASED,
  GET_COMPLETED_LIST_COURSES,
  LOGIN,
  LOGOUT,
  REMOVE_FROM_CART,
  REMOVE_FROM_LIST,
  RESET_CART,
  RESET_LIST,
  SET_COMPLETED,
  SET_LANGUAGE,
  SET_LIST,
  SET_PURCHASED,
} from "./userDefinedActions";

export const LoginUser =
  (id, email, userName, typeOfUser) => async (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: { id, email, userName, userType: typeOfUser },
    });
  };
export const LogoutUser = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: RESET_LIST });
  dispatch({ type: RESET_CART });
  dispatch({ type: CLEAR_PURCHASED });
  dispatch({ type: CLEAR_COMPLETED });
};

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const addToCart = (course) => ({
  type: ADD_TO_CART,
  payload: {
    courseId: course._id,
    name: course.name,
    price: course.price,
    creatorName: course.creatorName,
    image: course.image,
  },
});

export const removeFromCart = (course) => ({
  type: REMOVE_FROM_CART,
  payload: {
    price: course.price,
    courseId: course.courseId,
  },
});

export const resetCart = () => ({
  type: RESET_CART,
});

export const resetWishList = () => ({
  type: RESET_CART,
});

export const addToWishList = (item) => ({
  type: ADD_TO_LIST,
  payload: item,
});

export const setWishList = (array) => ({
  type: SET_LIST,
  payload: array,
});

export const removeFromWishList = (item) => ({
  type: REMOVE_FROM_LIST,
  payload: item,
});

export const resetPurchasedCourses = () => ({
  type: CLEAR_PURCHASED,
});

export const addPurchasedCourses = (item) => ({
  type: ADD_TO_PURCHASED,
  payload: item,
});

export const setPurchasedCourses = (array) => ({
  type: SET_PURCHASED,
  payload: array,
});

export const getCompletedListCourses = (array) => ({
  type: GET_COMPLETED_LIST_COURSES,
  payload: array,
});

export const resetCompletedCourses = () => ({
  type: CLEAR_COMPLETED,
});

export const addCompletedCourses = (item) => ({
  type: ADD_TO_COMPLETED,
  payload: item,
});

export const setCompletedCourses = (array) => ({
  type: SET_COMPLETED,
  payload: array,
});
