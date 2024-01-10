import { handleTitleOpen } from "../../utils/helper";

export default function OpenCloseItem({ title, text, active = "" }) {
  return (
    <li>
      <span
        className={`title-open flex align-items-center ${active}`}
        onClick={(event) => handleTitleOpen(event)}
      >
        <div className="icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="ArrowSquareRight">
              <path
                id="Vector"
                d="M20.25 19.5V4.5C20.25 4.08579 19.9142 3.75 19.5 3.75L4.5 3.75C4.08579 3.75 3.75 4.08579 3.75 4.5V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H19.5C19.9142 20.25 20.25 19.9142 20.25 19.5Z"
                stroke="#2C292A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_2"
                d="M12.5718 8.82178L15.7499 11.9999L12.5718 15.178"
                stroke="#2C292A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Vector_3"
                d="M8.25 12H15.75"
                stroke="#2C292A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
        {title}
      </span>
      <p className="hidden-result">{text}</p>
    </li>
  );
}
