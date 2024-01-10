import { Translator, Translate } from "react-auto-translate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const InstructorAccountHeader = ({ url }) => {
  const languageState = useSelector((state) => state.language);

  const arrayLinks = [
    {
      title: "Courses",
      link: "/instructor/courses/",
    },
    {
      title: "Create a Course",
      link: "/instructor/course/create/",
    },
  ];

  return (
    <>
      <ul className="account-header">
        {arrayLinks.map((item) => (
          <li className="hover:tw-scale-110 tw-transition-all tw-underline tw-underline-offset-4 ">
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

export default InstructorAccountHeader;
