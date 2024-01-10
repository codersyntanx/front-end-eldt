import {
  ADD_TO_CART,
  ADD_TO_COMPLETED,
  ADD_TO_LIST,
  ADD_TO_PURCHASED,
  CLEAR_COMPLETED,
  CLEAR_PURCHASED,
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
} from "./userDefinedActions.js";
const userReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: {
          id: action.payload.id,
          email: action.payload.email,
          userName: action.payload.userName,
          type: action.payload.userType,
          token: action.payload.token,
          expire: action.payload.expire,
        },
      };
    case LOGOUT: {
      delete state["user"];
      return { ...state };
    }
    default:
      return state;
  }
};

// languageReducer.js
const initialState = {
  language: { name: "English", value: "en", className: "flag-icon-us" }, // Default language is English
};

// Updated action creator

const initialCartState = {
  cartItems: [],
  discount: 0.0,
  total: 0,
};

const wishList = (state = [], action) => {
  switch (action.type) {
    case SET_LIST:
      const courses = action.payload;
      return [...courses];

    case ADD_TO_LIST:
      if (!state.includes(action.payload)) {
        // Check if the item is not already in the wishlist
        return [...state, action.payload];
      }
      return state; // Item already exists, do not add again

    case REMOVE_FROM_LIST:
      return state.filter((item) => item !== action.payload);

    case RESET_LIST:
      return [];

    default:
      return state;
  }
};

const purchased = (state = [], action) => {
  switch (action.type) {
    case SET_PURCHASED:
      const courses = action.payload;
      return [...courses];

    case ADD_TO_PURCHASED:
      if (!state.includes(action.payload)) {
        // Check if the item is not already in the wishlist
        return [...state, action.payload];
      }
      return state; // Item already exists, do not add again

    case CLEAR_PURCHASED:
      return [];

    default:
      return state;
  }
};

const completed = (state = [], action) => {
  switch (action.type) {
    case SET_COMPLETED:
      const courses = action.payload;
      return [...courses];

    case ADD_TO_COMPLETED:
      if (!state.includes(action.payload)) {
        // Check if the item is not already in the wishlist
        return [...state, action.payload];
      }
      return state; // Item already exists, do not add again

    case CLEAR_COMPLETED:
      return [];

    default:
      return state;
  }
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingCartItem = state.cartItems.find(
        (item) => item.courseId === action.payload.courseId
      );

      if (existingCartItem) {
        return state;
      }

      const total = state.total + action.payload.price;
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        total: total,
      };

    case REMOVE_FROM_CART:
      const updatedCartItems = state.cartItems.filter(
        (item) => item.courseId !== action.payload.courseId
      );
      return {
        ...state,
        cartItems: updatedCartItems,
        total: state.total - action.payload.price,
      };

    case RESET_CART:
      return {
        ...state,
        cartItems: [],
        total: 0,
      };

    default:
      return state;
  }
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        language: action.payload,
      };
    default:
      return state;
  }
};

export {
  userReducer,
  languageReducer,
  cartReducer,
  wishList,
  purchased,
  completed,
};
