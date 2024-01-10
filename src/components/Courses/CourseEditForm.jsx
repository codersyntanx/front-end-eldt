import RichTextEditor from "@mantine/rte";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Translator, Translate } from "react-auto-translate";
import controls from "../../utils/controls";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import {
  createCourse,
  editCourse,
  getCourseByIdForIns,
} from "../../services/Instructor";
import Swal from "sweetalert2";
import { LogoutUser } from "../../store/UserActions";
import { useNavigate, useParams } from "react-router-dom";
import TailwindLoader from "../../utils/tailwindLoader";

export default function CourseEditForm({ btnText, is_class }) {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const [course, setCourse] = useState({
    _id: "65456118d9d0f47dc81214b8",
    name: "CDL Class A & B",
    image: "Image Object",
    description: "Test Course ",
    createdBy: "6526de851a6753379892aef9",
    creatorName: "haseeb",
    enrolledStudents: [],
    lastUpdated: "2023-11-03T20:49:20.193Z",
    learningType: "COURSE",
    completedBy: [],
    completedByDetails: [],
    lessons: 5,
    status: "ACTIVE",
    price: 25,
    overview: "<p>Entry Level Driving Training Course</p>",
    whatYouWillLearn: "<p>ELDT</p>",
    requirements: "<p>You must have A regular driver license </p>",
    courseIsFor: "<p>Everyone</p>",
    assets: [],
    updatedAt: "2023-11-03T20:49:20.193Z",
    duration: 4,
    subtitle: false,
    accessTime: "LIFE_TIME",
    enableEditing: false,
    createAt: "2023-11-03T21:07:36.850Z",
    enrolledStudentsByDetails: [],
    __v: 0,
  });
  const { courseId } = useParams();

  const languageState = useSelector((state) => state.language);
  const userState = useSelector((state) => state.user);
  const fetchCourseDetails = async () => {
    setLoading(true);
    const result = await getCourseByIdForIns(courseId, cookies.user);
    if (result.success) {
      setCourse(result.course);
    } else Swal.fire("Error", result.message, "error");
    setLoading(false);
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(["COURSE", "ENDORSEMENT"]);
  const [imagePreview, setImagePreview] = React.useState("");
  const dispatch = useDispatch();
  useEffect(() => {}, []);
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
          courseId: course._id,
          //   category,
          whatYouWillLearn: course.whatYouWillLearn,
          requirements: course.requirements,
          courseIsFor: course.courseIsFor,
          description: course.description,
          createdBy: userState.user.id,
          creatorName: userState.user.userName,
          name: course.name,
          price: course.price,
          // image,
          learningType: course.learningType,
          // assets,
          lessons: course.lessons,
          duration: course.duration,
          accessTime: course.accessTime,
        };
        const result = await editCourse(data, cookie);
        if (result.success) {
          Swal.fire({
            title: "course has been edited",
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
        <div className="col-md-4">
          <div className="form-group">
            <label className="form-label fw-semibold">Course Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Course Title"
              name="title"
              value={course.name}
              onChange={handleChange}
              style={{ color: "black" }}
              required
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label className="form-label fw-semibold">Lessons</label>
            <input
              type="number"
              className="form-control"
              placeholder="5"
              name="lessons"
              value={course.lessons}
              style={{ color: "black" }}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label className="form-label fw-semibold">Latest Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="29.99"
              aria-describedby="latest_price_help"
              name="latest_price"
              value={course.price}
              style={{ color: "black" }}
              onChange={handleChange}
            />
            <div id="latest_price_help" className="form-text">
              The latest price will show as the course price.
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label className="form-label fw-semibold">Duration (Weeks)</label>
            <input
              type="number"
              className="form-control"
              placeholder="2 Weeks"
              name="duration"
              value={course.duration}
              style={{ color: "black" }}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label className="form-label fw-semibold">Access Time</label>
            <select
              required
              className="form-select"
              name="access_time"
              style={{ color: "black" }}
              value={course.accessTime}
              onChange={(e) => {
                setCourse({ ...course, accessTime: e.target.value });
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
        <div className="col-md-4">
          <div className="form-group">
            <label className="form-label fw-semibold">Course Category</label>
            <select
              required
              className="form-select"
              name="catId"
              style={{ color: "black" }}
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

        <div className="col-md-4">
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
              style={{ color: "black" }}
              className="form-control"
              name="short_desc"
              value={course.description}
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
              style={{ color: "black" }}
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
              style={{ color: "black" }}
              controls={controls}
              value={course.whatYouWillLearn}
              onChange={(e) =>
                setCourse((prevState) => ({
                  ...prevState,
                  whatYouWillLearn: e,
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
              style={{ color: "black" }}
              value={course.courseIsFor}
              onChange={(e) =>
                setCourse((prevState) => ({
                  ...prevState,
                  courseIsFor: e,
                }))
              }
            />
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="default-btn" disabled={disabled}>
            {btnText || "Save"}{" "}
            <span>
              <Translate></Translate>
            </span>
            {loading ? <TailwindLoader /> : ""}
          </button>
        </div>
      </div>
    </form>
  );
}
