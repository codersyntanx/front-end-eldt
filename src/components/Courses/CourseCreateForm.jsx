import RichTextEditor from "@mantine/rte";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Translator, Translate } from "react-auto-translate";
import controls from "../../utils/controls";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { createCourse } from "../../services/Instructor";
import Swal from "sweetalert2";
import { LogoutUser } from "../../store/UserActions";
import { useNavigate } from "react-router-dom";
// const RichTextEditor = dynamic(() => import("@mantine/rte"), {
//   ssr: false,
//   loading: () => null,
// });

export default function CourseCreateForm({ btnText, is_class }) {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const languageState = useSelector((state) => state.language);
  const userState = useSelector((state) => state.user);

  const INITIAL_VALUE = {
    title: "",
    short_desc: "",
    overview: "",
    latest_price: 0.0,
    lessons: "",
    duration: "",
    image: "",
    access_time: "",
    requirements: "",
    what_you_will_learn: "",
    who_is_this_course_for: "",
    catId: "COURSE",
  };

  const [course, setCourse] = useState(INITIAL_VALUE);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(["COURSE", "ENDORSEMENT"]);
  const [imagePreview, setImagePreview] = React.useState("");
  const dispatch = useDispatch();
  useEffect(() => {}, []);

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const image = files[0].size / 1024 / 1024;
      if (image > 2) {
        toast.error(
          "The photo size greater than 2 MB. Make sure less than 2 MB.",
          {
            style: {
              border: "1px solid #ff0033",
              padding: "16px",
              color: "#ff0033",
            },
            iconTheme: {
              primary: "#ff0033",
              secondary: "#FFFAEE",
            },
          }
        );
        e.target.value = null;
        return;
      }
      setCourse((prevState) => ({
        ...prevState,
        image: files[0],
      }));
      setImagePreview(window.URL.createObjectURL(files[0]));
    } else {
      setCourse((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        const cookie = cookies.user;
        e.preventDefault();
        const data = {
          //   category,
          whatYouWillLearn: course.what_you_will_learn,
          requirements: course.requirements,
          courseIsFor: course.who_is_this_course_for,
          description: course.short_desc,
          createdBy: userState.user.id,
          creatorName: userState.user.userName,
          name: course.title,
          price: course.latest_price,
          // image,
          overview: course.overview,
          learningType: course.catId,
          // assets,
          lessons: course.lessons,
          duration: course.duration,
          accessTime: course.access_time,
        };
        const result = await createCourse(data, cookie);
        if (result.success) {
          Swal.fire({
            title: "course has been created",
            text: "Please Upload Lesson and ask admin to approve the course",
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
          Swal.fire({
            title: "Error while creating course",
            text: result.message,
          });
        }
      }}
    >
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Course Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Course Title"
              name="title"
              value={course.title}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Lessons</label>
            <input
              type="number"
              className="form-control"
              placeholder="5"
              name="lessons"
              value={course.lessons}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Latest Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="29.99"
              aria-describedby="latest_price_help"
              name="latest_price"
              value={course.latest_price}
              onChange={handleChange}
            />
            <div id="latest_price_help" className="form-text">
              The latest price will show as the course price.
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Duration (Weeks)</label>
            <input
              type="number"
              className="form-control"
              placeholder="2 Weeks"
              name="duration"
              value={course.duration}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Access Time</label>
            <select
              required
              className="form-select"
              name="access_time"
              value={course.access_time}
              onChange={(e) => {
                setCourse({ ...course, access_time: e.target.value });
              }}
            >
              <option value="">
                <Translate>Select</Translate>
              </option>
              <option value="LIFE_TIME">
                <Translate>Lifetime</Translate>
              </option>
              <option value="3_MONTHS">
                <Translate>Three Months</Translate>
              </option>
              <option value="6_MONTHS">
                <Translate>Six Months</Translate>
              </option>
              <option value="12_MONTHS">
                <Translate>1 Year</Translate>
              </option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Course Category</label>
            <select
              required
              className="form-select"
              name="catId"
              value={course.catId}
              onChange={(e) => {
                setCourse({ ...course, catId: e.target.value });
              }}
            >
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            {/* <label className="form-label fw-semibold">Course Image</label> */}
            {/* <input
              required
              type="file"
              className="form-control file-control"
              name="image"
              onChange={handleChange}
            /> */}
            {/* <div className="form-text">Upload image size 750x500!</div> */}

            {/* <div className="mt-2">
              <img
                src={
                  imagePreview ? imagePreview : "/images/courses/courses15.jpg"
                }
                alt="image"
                className="img-thumbnail w-100px me-2"
              />
            </div> */}
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group">
            <label className="form-label fw-semibold">Short Description</label>
            <textarea
              required
              className="form-control"
              name="short_desc"
              value={course.short_desc}
              onChange={handleChange}
            />
            <div className="form-text">
              The description will highlight all available areas.
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Overview</label>
            <RichTextEditor
              controls={controls}
              // onImageUpload={handleImageUpload}
              value={course.overview}
              onChange={(e) =>
                setCourse((prevState) => ({
                  ...prevState,
                  overview: e,
                }))
              }
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">Requirements</label>
            <RichTextEditor
              controls={controls}
              value={course.requirements}
              onChange={(e) =>
                setCourse((prevState) => ({
                  ...prevState,
                  requirements: e,
                }))
              }
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">
              What You Will Learn
            </label>
            <RichTextEditor
              controls={controls}
              value={course.what_you_will_learn}
              onChange={(e) =>
                setCourse((prevState) => ({
                  ...prevState,
                  what_you_will_learn: e,
                }))
              }
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label fw-semibold">
              Who Is This Course For?
            </label>
            <RichTextEditor
              controls={controls}
              value={course.who_is_this_course_for}
              onChange={(e) =>
                setCourse((prevState) => ({
                  ...prevState,
                  who_is_this_course_for: e,
                }))
              }
            />
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="default-btn" disabled={disabled}>
            {btnText || "Create Course"}{" "}
            <span>
              <Translate></Translate>
            </span>
            {loading ? <LoadingSpinner /> : ""}
          </button>
        </div>
      </div>
    </form>
  );
}
