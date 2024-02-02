import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./PrivateRoutes";
import MainLogin from "../pages/MainLogin";
import AboutUs from "../pages/AboutUs";
import InstructorRoutes from "./AdminRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";
import StudentRoutes from "./StudentRoutes";
import HeaderFooter from "../components/global/HeaderFooter";
import AuthenticationStudent from "../pages/AuthenticationStudent";
import WorkWithUs from "../pages/workWithUs";
import ForgotPassword from "../components/authentication/ForgotPassword";
import Courses from "../pages/Guest/Courses";
import CreateCourses from "../pages/Instrcutor/Courses/CreateCourses";
import EditCourses from "../pages/Instrcutor/Courses/EditCourses";
import Faq from "../pages/Faq";
import ContactUs from "../pages/ContactUs";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsAndCondition from "../pages/TermsAndCondition";
import AuthenticationInstructor from "../pages/AuthenticationInstructor";
import NotFound from "../components/404";
import Course from "../pages/Guest/Course";
import Checkout from "../pages/Checkout";
import HomeMain from "../pages/HomeMain";
import EditLesson from "../pages/Instrcutor/Lesson/EditLesson";
import StudentDashboard from "../pages/Student/StudentDashboard";
import InstructorDashboard from "../pages/Instrcutor/InsDashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import LearnCourse from "../pages/Student/Learning/LearnCourse";
import PurchasedCourses from "../pages/Student/Courses/PurchasedCourses";
import CoursesCreated from "../pages/Instrcutor/Courses/CoursesCreated";
import VerifyAccountStudent from "../pages/Student/VerifyAccountStudent";
import AuthenticationAdmin from "../pages/AuthenticationAdmin";
import InsProfileEdit from "../pages/Instrcutor/InsProfileEdit";
import InsProfile from "../pages/Instrcutor/InsProfile";
import Profile from "../pages/Student/Profile";
import ProfileEdit from "../pages/Student/ProfileEdit";
import WishList from "../pages/Student/Courses/WishListCourses";
import AllStudents from "../pages/Admin/Student/AllStudents";
import AllInstructors from "../pages/Admin/Teacher/AllInstructors";
import SendConfirmationEmail from "../pages/SendConfirmationEmail";
import AllCourses from "../pages/Admin/Course/AllCourses";
import EditQuiz from "../pages/Instrcutor/Lesson/Quiz/EditQuiz";
import MyCourseProgress from "../pages/Student/MyCourseProgress";
import LessonDataEditor from "../pages/Instrcutor/LessonDataEditor.jsx";
import CreateLessonUpdated from "../pages/Instrcutor/Lesson/CreateLessonUpdated";
import Homepage from "../Studentdashboard/Homepage";
import AddLessonForm from "./AddLessonForm";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Studypage from "../Studentdashboard/Studypage.jsx";
import Quize from "../Studentdashboard/Quiz.jsx";
import QuizLesson from "../Studentdashboard/QuizLessons.jsx";
import Allchap from "../Studentdashboard/Allchap.jsx";
import Logout from "../Studentdashboard/Logout.jsx"
import Alltext from "../Studentdashboard/Alltext.jsx"
import Loader from "../Studentdashboard/Loader.jsx";
const AppRoutes = () => {
  const [userId, setUserId]=useState(null)

  useEffect(() => {
    const personId = localStorage.getItem("userId");
    if (personId) {
      const decoded = jwtDecode(personId);
      setUserId(decoded);
    }
  }, []);
  return (
    <Router>
      <div
        className=""
        style={{
          maxHeight: "fit-content",
        }}
      >
        <Routes>
          {/* ================= Public Routes Started */}
          <Route
            path="/tokenExpired"
            element={
              <HeaderFooter>
                <div className="display-3 text-center"> Token Expired </div>
              </HeaderFooter>
            }
          />
 <Route
            path="/addlesson"
            element={
             <AddLessonForm/>
            }
          />
           <Route
            path="/logout"
            element={
             <Logout/>
            }
          />
              <Route
            path="/text"
            element={
             <Alltext/>
            }
          />
          
<Route
path="/loader"
element={
  <Loader/>
}/>
     
    <Route
      path="/quiz/:id"
      element={
        <QuizLesson />
      }
    />
  

    <Route
      path="/test/:index/:chap"
      element={
        <Quize />
      }
    />
  

    <Route
      path="/Alllessons/:id"
      element={
        <Allchap/>
      }
    />
  
          <Route
            path="/"
            element={
              <HeaderFooter>
                <HomeMain />
              </HeaderFooter>
            }
          />
          <Route
            path="login"
            element={
                <AuthenticationStudent />
            }
          />

          <Route
            path="/authentication/instructor"
            element={
              <HeaderFooter>
                <AuthenticationInstructor />
              </HeaderFooter>
            }
          />

    <Route
      path="/StudentLesson/:id/:index"
      element={
        <Studypage />
      }
    />
  

          <Route
            path="/authentication/admin"
            element={
              <HeaderFooter>
                <AuthenticationAdmin />
              </HeaderFooter>
            }
          />
          

          <Route
            path="/forgot-password"
            element={
              <HeaderFooter>
                <ForgotPassword />
              </HeaderFooter>
            }
          />
          <Route
            path="/student/verifyAccount"
            element={
              <HeaderFooter>
                <VerifyAccountStudent />
              </HeaderFooter>
            }
          />
          <Route
            path="/instructor/verifyAccount"
            element={
              <HeaderFooter>
                <VerifyAccountStudent />
              </HeaderFooter>
            }
          />

          <Route
            path="/instructor/new-lesson-editor"
            element={
              <HeaderFooter>
                <LessonDataEditor />
              </HeaderFooter>
            }
          />

          <Route
            path="/instructor/courses/"
            element={
              <HeaderFooter>
                <CoursesCreated />
              </HeaderFooter>
            }
          />

          <Route
            path="/courses"
            element={
              <HeaderFooter>
                <Courses />
              </HeaderFooter>
            }
          />
          <Route
            path="/courses/category/:category"
            element={
              <HeaderFooter>
                <Courses />
              </HeaderFooter>
            }
          />

          <Route
            path="/course/:courseId"
            element={
              <HeaderFooter>
                <Course />
              </HeaderFooter>
            }
          />

          <Route
            path="/course"
            element={
              <HeaderFooter>
                <Courses />
              </HeaderFooter>
            }
          />

          <Route
            path="/work-with-us"
            element={
              <HeaderFooter>
                <WorkWithUs />
              </HeaderFooter>
            }
          />
          <Route
            path="/faq"
            element={
              <HeaderFooter>
                <Faq />
              </HeaderFooter>
            }
          />
          <Route
            path="/contact-us"
            element={
              <HeaderFooter>
                <ContactUs />
              </HeaderFooter>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <HeaderFooter>
                <PrivacyPolicy />
              </HeaderFooter>
            }
          />
          <Route
            path="/terms-and-conditions"
            element={
              <HeaderFooter>
                <TermsAndCondition />
              </HeaderFooter>
            }
          />
          <Route
            path="/checkout"
            element={
              <HeaderFooter>
                <Checkout />
              </HeaderFooter>
            }
          />
          <Route
            path="/send-confirmation-email"
            element={
              <HeaderFooter>
                <SendConfirmationEmail />
              </HeaderFooter>
            }
          />

          {/* ================= Public Routes Started Ended */}

          {/* ============== Protected Routes  */}
          <Route element={<ProtectedRoute />}>
            {/* ============== Instructor Routes Started */}
            <Route element={<InstructorRoutes />}>
              <Route
                path="/instructor/profile/edit"
                element={
                  <HeaderFooter>
                    <InsProfileEdit />
                  </HeaderFooter>
                }
              />
              <Route
                path="/instructor/profile"
                element={
                  <HeaderFooter>
                    <InsProfile />
                  </HeaderFooter>
                }
              />
              <Route
                path="/instructor/profile"
                element={
                  <HeaderFooter>
                    <InsProfile />
                  </HeaderFooter>
                }
              />

              <Route
                path="/instructor/my-courses"
                element={
                  <HeaderFooter>
                    <CoursesCreated />
                  </HeaderFooter>
                }
              />

              <Route
                path="/instructor/course/lesson/edit/:lessonId"
                element={
                  <HeaderFooter>
                    <EditLesson />
                  </HeaderFooter>
                }
              />
              <Route
                path="/instructor/course/lesson/mcq/edit/:lessonId"
                element={
                  <HeaderFooter>
                    <EditQuiz />
                  </HeaderFooter>
                }
              />

              <Route
                path="/instructor/courses/edit/:courseId"
                element={
                  <HeaderFooter>
                    <EditCourses />
                  </HeaderFooter>
                }
              />
              <Route
                path="/instructor/course/create"
                element={
                  <HeaderFooter>
                    <CreateCourses />
                  </HeaderFooter>
                }
              />
              <Route
                path="/instructor/dashboard"
                element={
                  <HeaderFooter>
                    <InstructorDashboard />
                  </HeaderFooter>
                }
              />

              <Route
                path="/instructor/course/:courseId/lesson/create"
                element={
                  <HeaderFooter>
                    {/* <CreateLesson />
                     */}
                    <CreateLessonUpdated />
                  </HeaderFooter>
                }
              />
            </Route>
            {/* ============== Instructor Routes ended  */}

            {/* ============== Student Routes Started  */}

            <Route element={<StudentRoutes />}>
              <Route
                path="/student/learn/course/:courseId"
                element={
                  <HeaderFooter>
                    <LearnCourse />
                  </HeaderFooter>
                }
              />
              <Route
                path="/student/my-progress"
                element={
                  <HeaderFooter>
                    <MyCourseProgress />
                  </HeaderFooter>
                }
              />

              <Route
                path="/student/my-courses/"
                element={
                  <HeaderFooter>
                    <PurchasedCourses />
                  </HeaderFooter>
                }
              />
              <Route
                path="/student/wish-list/"
                element={
                  <HeaderFooter>
                    <WishList />
                  </HeaderFooter>
                }
              />

              <Route
                path="/student/dashboard"
                element={
                  <HeaderFooter>
                    <StudentDashboard />
                  </HeaderFooter>
                }
              />
              <Route
                path="/student/profile/edit"
                element={
                  <HeaderFooter>
                    <ProfileEdit />
                  </HeaderFooter>
                }
              />
              <Route
                path="/student/profile"
                element={
                  <HeaderFooter>
                    <Profile />
                  </HeaderFooter>
                }
              />
            </Route>

            {/* ============== Student Routes Ended  */}

            {/* ============== Admin Routes Started  */}

            <Route element={<SuperAdminRoutes />}>
              <Route
                path="/admin/dashboard"
                element={
                  <HeaderFooter>
                    <AdminDashboard />
                  </HeaderFooter>
                }
              />
              <Route
                path="/admin/instructors"
                element={
                  <HeaderFooter>
                    <AllInstructors />
                  </HeaderFooter>
                }
              />
              <Route
                path="/admin/courses"
                element={
                  <HeaderFooter>
                    <AllCourses />
                  </HeaderFooter>
                }
              />

              <Route
                path="/admin/students"
                element={
                  <HeaderFooter>
                    <AllStudents />
                  </HeaderFooter>
                }
              />
            </Route>
          </Route>
          {/* ============== Admin Routes Ended  */}
          <Route path="/studentdash/*" element={<Homepage />} />

          <Route
            path="/*"
            element={
              <HeaderFooter>
                <NotFound />
              </HeaderFooter>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};
export default AppRoutes;
