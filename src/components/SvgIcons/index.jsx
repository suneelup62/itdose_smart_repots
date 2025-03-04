export const TempRoomOut = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="30"
      height="10"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="feather feather-log-out"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
};
export const CancelSVG = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="red"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  );
};
export const ReprintSVG = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="6 9 6 2 18 2 18 9"></polyline>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
      <rect x="6" y="14" width="12" height="8"></rect>
    </svg>
  );
};

export const PrintSVG = () => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      className="icon"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      width="30"
      height="25"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M192 234.666667h640v64H192z" fill="#424242"></path>
        <path
          d="M85.333333 533.333333h853.333334v-149.333333c0-46.933333-38.4-85.333333-85.333334-85.333333H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333333v149.333333z"
          fill="#616161"
        ></path>
        <path
          d="M170.666667 768h682.666666c46.933333 0 85.333333-38.4 85.333334-85.333333v-170.666667H85.333333v170.666667c0 46.933333 38.4 85.333333 85.333334 85.333333z"
          fill="#424242"
        ></path>
        <path
          d="M853.333333 384m-21.333333 0a21.333333 21.333333 0 1 0 42.666667 0 21.333333 21.333333 0 1 0-42.666667 0Z"
          fill="#00E676"
        ></path>
        <path
          d="M234.666667 85.333333h554.666666v213.333334H234.666667z"
          fill="#90CAF9"
        ></path>
        <path
          d="M800 661.333333h-576c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32h576c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32z"
          fill="#242424"
        ></path>
        <path
          d="M234.666667 661.333333h554.666666v234.666667H234.666667z"
          fill="#90CAF9"
        ></path>
        <path
          d="M234.666667 618.666667h554.666666v42.666666H234.666667z"
          fill="#42A5F5"
        ></path>
        <path
          d="M341.333333 704h362.666667v42.666667H341.333333zM341.333333 789.333333h277.333334v42.666667H341.333333z"
          fill="#1976D2"
        ></path>
      </g>
    </svg>
  );
};

export const FilterSVG = ({ onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="#6e6d6d"
      stroke="#6e6d6d"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="feather feather-filter mx-1"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  );
};

export const RateSVG = ({ onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="green"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-activity mx-1"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {/* Circle */}
      <circle cx="12" cy="12" r="10" stroke="green" fill="none" />

      {/* Letter R centered */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="12"
        fill="green"
      >
        R
      </text>
    </svg>
  );
};

export const DiscountSVG = ({ onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="blue"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-activity mx-1"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {/* Circle */}
      <circle cx="12" cy="12" r="10" stroke="blue" fill="none" />

      {/* Letter R centered */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="12"
        fill="blue"
      >
        D
      </text>
    </svg>
  );
};

export const RejectSVG = ({ onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="red"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-activity mx-1"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {/* Circle */}
      <circle cx="12" cy="12" r="10" stroke="red" fill="none" />

      {/* Letter R centered */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="12"
        fill="red"
      >
        X
      </text>
    </svg>
  );
};

export const PackageSVG = ({ onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="purple"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-activity mx-1"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {/* Circle */}
      <circle cx="12" cy="12" r="10" stroke="purple" fill="none" />

      {/* Letter R centered */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="12"
        fill="purple"
      >
        PG
      </text>
    </svg>
  );
};

export const PayableSVG = ({ onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e30255"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-activity mx-1"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {/* Circle */}
      <circle cx="12" cy="12" r="10" stroke="#e30255" fill="none" />

      {/* Letter R centered */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="12"
        fill="#e30255"
      >
        P
      </text>
    </svg>
  );
};

export const NoNPayableSVG = ({ onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e39e02"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-activity mx-1"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {/* Circle */}
      <circle cx="12" cy="12" r="10" stroke="#e39e02" fill="none" />

      {/* Letter R centered */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="12"
        fill="#e39e02"
      >
        NP
      </text>
    </svg>
  );
};

export const QuantitySVG = ({ onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#e39e02"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-activity mx-1"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {/* Circle */}
      <circle cx="12" cy="12" r="10" stroke="#e39e02" fill="none" />

      {/* Letter R centered */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="12"
        fill="#e39e02"
      >
        Q
      </text>
    </svg>
  );
};

export const TotalCapacitySVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="40%"
      height="40%"
      x="0"
      y="0"
      viewBox="0 0 340 340"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
    >
      <g>
        <path
          fill="#ffd6bb"
          d="M48.549 206.471s17.835 14.5 31.529 28.013l22.822-10.752S88.67 212.3 82.139 195.974z"
          opacity="1"
          data-original="#ffd6bb"
        ></path>
        <path
          fill="#f4a28c"
          d="m80.078 234.484 7.435-3.5-1.7-5.554-4.3-4.358A3.344 3.344 0 0 1 82 215.96l8.312-5.687a64.208 64.208 0 0 1-8.173-14.3l-33.59 10.5s17.835 14.496 31.529 28.011z"
          opacity="1"
          data-original="#f4a28c"
        ></path>
        <path
          fill="#9dddf4"
          d="M153.874 110.8h33.107a5.88 5.88 0 0 1 5.88 5.88v62.28h-29.29a9.7 9.7 0 0 1-9.7-9.7V110.8h.003z"
          opacity="1"
          data-original="#9dddf4"
        ></path>
        <path
          fill="#d8d8d8"
          d="M169.064 60.41h-22.588a24.041 24.041 0 0 0-24.04 24.041v152.377h14.3V86.177A11.466 11.466 0 0 1 148.2 74.711h20.862a7.151 7.151 0 0 0 7.151-7.15 7.151 7.151 0 0 0-7.149-7.151z"
          opacity="1"
          data-original="#d8d8d8"
        ></path>
        <path
          fill="#6abacc"
          d="M10.519 238.316v90.395h100.466z"
          opacity="1"
          data-original="#6abacc"
        ></path>
        <path
          fill="#9dddf4"
          d="m23.249 198.348 92.241 84.436h215.029v45.927h-229.25A24.771 24.771 0 0 1 83.9 321.6l-65.453-64.368a26.53 26.53 0 0 1-7.928-18.916v-21.657a19.534 19.534 0 0 1 12.73-18.311z"
          opacity="1"
          data-original="#9dddf4"
        ></path>
        <path
          fill="#bfd6ef"
          d="M86.172 221.161a46.588 46.588 0 0 1 5.614-1.689 45.257 45.257 0 0 1 38.5 8.454l6.195 4.85a33.024 33.024 0 0 0 20.359 7.022h140.123a33.557 33.557 0 0 1 33.556 33.557v9.429H115.49L84.991 255.2z"
          opacity="1"
          data-original="#bfd6ef"
        ></path>
        <path
          fill="#bfd6ef"
          d="m110.1 236.828-11.047-10.934a16.416 16.416 0 0 0-23.833.7c-.085.1-.169.192-.253.29a17.568 17.568 0 0 0-2.567 6.876 16.164 16.164 0 0 0 5.2 14.34l11.345 10.385z"
          opacity="1"
          data-original="#bfd6ef"
        ></path>
        <path
          fill="#ffd6bb"
          d="M46.292 208.816s4.559 1.611 11.79-1.188l7.755 4.555a11.882 11.882 0 0 0 13.3-.858L93 200.569a9.546 9.546 0 0 0 2.1-12.834c-6.758-10.134-20.117-27.984-35.856-37.488l-31.019 24.258s.911 23.602 18.067 34.311z"
          opacity="1"
          data-original="#ffd6bb"
        ></path>
        <path
          fill="#7babdb"
          d="M94.9 252.39 82.348 239.8c-8.292-10.178-.176-17.718-.007-17.873a16.112 16.112 0 0 0-7.121 4.673c-.085.1-.169.192-.252.29a17.559 17.559 0 0 0-2.568 6.87 16.164 16.164 0 0 0 5.2 14.34l11.345 10.385zM330.509 273.008a33.505 33.505 0 0 0-14.325-27.153c1.361 22.385-20.838 26.6-32.844 27.256l-166.812-.1-9.33 2.275 8.293 7.5h215.028v-9.429c0-.119-.009-.233-.01-.349z"
          opacity="1"
          data-original="#7babdb"
        ></path>
        <path
          fill="#ffd6bb"
          d="m88.944 258.484 21.156-21.656 20.234 20.034 38.181.227A21.911 21.911 0 0 1 190.291 279v3.785h-74.8z"
          opacity="1"
          data-original="#ffd6bb"
        ></path>
        <path
          fill="#f4a28c"
          d="M115.872 270.469 94.9 252.39l-5.952 6.094 26.546 24.3h74.8V279a21.9 21.9 0 0 0-.834-5.982h-66.73a10.5 10.5 0 0 1-6.858-2.549z"
          opacity="1"
          data-original="#f4a28c"
        ></path>
        <path
          fill="#6f6f7f"
          d="M15.349 185.985s-11.716-11.416-2.1-26.436 46.261-40.556 46.261-40.556l2.1 14.72 3.928 2.23a6.4 6.4 0 0 1 1.443 10.02L40.4 173.453a8.624 8.624 0 0 0 1.778 13.484c.078.044.158.087.238.13a3.99 3.99 0 0 1 1.512 5.614c-2.09 3.475-3.331 9.062 2.362 16.135.002 0-30.039 8.712-30.941-22.831z"
          opacity="1"
          data-original="#6f6f7f"
        ></path>
        <path
          fill="#ffdc6c"
          d="M267.7 11.28c-18.821 17.869-62.221 9.755-62.221 9.755v63.316a59.532 59.532 0 0 0 4.027 21.915c15.634 39.51 58.194 47.427 58.194 47.427s42.56-7.917 58.193-47.427a59.513 59.513 0 0 0 4.028-21.915V21.035s-43.404 8.114-62.221-9.755z"
          opacity="1"
          data-original="#ffdc6c"
        ></path>
        <path
          fill="#ffedd2"
          d="M267.7 11.28a34.638 34.638 0 0 1-10.378 6.61l-51.847 51.842v14.619a61.127 61.127 0 0 0 2.283 16.759l80.156-80.156c-7.676-1.673-14.921-4.644-20.214-9.674zM215.032 117.35a72.011 72.011 0 0 0 7.649 10.308L323.922 26.764V21.9c-3.349.4-7.873.8-12.988.932z"
          opacity="1"
          data-original="#ffedd2"
        ></path>
        <path
          fill="#fca742"
          d="M325.889 106.266a59.513 59.513 0 0 0 4.028-21.915V21.035s-43.4 8.114-62.221-9.755v142.413s42.56-7.917 58.193-47.427z"
          opacity="1"
          data-original="#fca742"
        ></path>
        <path
          fill="#ffedd2"
          d="M205.475 54.972 238.052 22.4c-2.568.247-5.116.386-7.59.444l-24.987 24.982z"
          opacity="1"
          data-original="#ffedd2"
        ></path>
        <g fill="#494456">
          <path
            d="M13.966 199.5a23.52 23.52 0 0 0-7.447 17.164v112.047a4 4 0 0 0 4 4H71.28a4 4 0 0 0 0-8H14.519v-65.8c.364.4.737.79 1.123 1.169l65.452 64.371a28.611 28.611 0 0 0 20.176 8.257h229.249a4 4 0 0 0 4-4v-55.353a37.6 37.6 0 0 0-37.557-37.555H156.845a29.163 29.163 0 0 1-16.108-4.891V86.177a7.475 7.475 0 0 1 7.465-7.466h20.862a11.15 11.15 0 1 0 0-22.3h-22.587a28.072 28.072 0 0 0-28.041 28.04v123.463a4 4 0 0 0 8 0V84.451a20.063 20.063 0 0 1 20.041-20.04h22.587a3.15 3.15 0 1 1 0 6.3H148.2a15.483 15.483 0 0 0-15.465 15.466v138.585a49.076 49.076 0 0 0-33.853-10.428 79.08 79.08 0 0 1-6.587-8.157l3.154-2.447a13.6 13.6 0 0 0 2.981-18.215 190.365 190.365 0 0 0-5.236-7.443c-.034-.047-.066-.094-.1-.139-6.27-8.467-15.207-19.025-25.518-26.829l2.282-2.36a10.4 10.4 0 0 0-2.343-16.28l-2.221-1.26-1.825-12.776a4 4 0 0 0-6.246-2.717c-1.523 1.062-37.418 26.168-47.346 41.681-8.306 12.98-3.128 24.777 1.541 30.235a35.944 35.944 0 0 0 2.548 11.873zm312.553 125.211H101.27a20.656 20.656 0 0 1-14.57-5.962L21.252 254.38a22.671 22.671 0 0 1-6.733-16.064v-21.657a15.534 15.534 0 0 1 3.844-10.229 21.6 21.6 0 0 0 3.134 2.784c5.094 3.715 11.114 4.7 16.071 4.7a40.022 40.022 0 0 0 8.732-.977 18.853 18.853 0 0 0 4.183.332c4.4 3.69 11.59 9.833 18.78 16.454a22.748 22.748 0 0 0-.813 3.418c-.054.347-.094.7-.129 1.042l-12.39-11.342a4 4 0 1 0-5.4 5.9l24.356 22.3.013.012 11.345 10.385 26.546 24.3a4 4 0 0 0 2.7 1.05h211.028zM87.008 225.12a12.419 12.419 0 0 1 9.231 3.617l8.22 8.137-15.671 16.044-1.3-1.187-7.2-6.59a12.106 12.106 0 0 1-3.938-10.762 14.258 14.258 0 0 1 1.806-5.065l.058-.067a12.146 12.146 0 0 1 8.794-4.127zm40.508 34.585a4 4 0 0 0 2.79 1.157l38.182.227a17.955 17.955 0 0 1 17.8 17.695h-69.244l-22.352-20.461.125-.128 15.326-15.695zm.309-28.629 6.2 4.85c.15.118.3.228.457.343l.032.024a37.194 37.194 0 0 0 22.336 7.5h140.112a29.59 29.59 0 0 1 29.557 29.557v5.429H194.285a25.969 25.969 0 0 0-25.75-25.695l-36.55-.217-19.075-18.882-11.043-10.934c-.288-.285-.6-.54-.9-.806a41.148 41.148 0 0 1 26.858 8.831zm-38.2-15.183a52.63 52.63 0 0 0-4.422 1.359 19.986 19.986 0 0 0-11.76 5.448 517.623 517.623 0 0 0-6.2-5.568 15.727 15.727 0 0 0 14.348-2.647l4.374-3.393q1.715 2.433 3.665 4.801zm-4.5-35.245a15.957 15.957 0 0 1-10.867 6.644 4 4 0 1 0 1.134 7.92 24.039 24.039 0 0 0 14.6-7.873c.637.92 1.243 1.807 1.782 2.616a5.566 5.566 0 0 1-1.229 7.455l-13.861 10.754a7.842 7.842 0 0 1-8.821.57l-7.756-4.555a3.993 3.993 0 0 0-3.469-.281 20.253 20.253 0 0 1-5.114 1.293c-.051 0-.1.011-.153.017a13.043 13.043 0 0 1-2.788 0c-2.731-3.857-3.134-7.293-1.225-10.468a8.108 8.108 0 0 0 .872-6.311 7.9 7.9 0 0 0-3.963-4.91l-.13-.071a4.3 4.3 0 0 1-2.151-3.186 4.764 4.764 0 0 1 1.291-4.03l18.7-19.343c9.095 6.684 17.172 15.911 23.153 23.759zm-68.509-18.943c6.94-10.845 29.489-28.024 39.867-35.613l1.169 8.187a4 4 0 0 0 1.986 2.913l3.927 2.229a2.4 2.4 0 0 1 .542 3.762l-5.444 5.631-.021.021-21.116 21.837a12.71 12.71 0 0 0-3.456 10.751 12.265 12.265 0 0 0 6.149 9 .989.989 0 0 1 .282.2 15.943 15.943 0 0 0-.76 15.2c-3.988.283-9.4-.064-13.531-3.074-4.324-3.152-6.632-8.831-6.862-16.879a4.067 4.067 0 0 0-1.189-2.734c-.953-.951-9.09-9.636-1.543-21.431z"
            fill="#494456"
            opacity="1"
            data-original="#494456"
          ></path>
          <path
            d="M173.369 85.293a4 4 0 0 0-4 4v17.445h-15.494a4 4 0 0 0-4 4V169.2a13.713 13.713 0 0 0 13.7 13.7h29.29a4 4 0 0 0 4-4v-62.28a9.89 9.89 0 0 0-9.88-9.88h-9.613V89.293a4 4 0 0 0-4.003-4zm15.493 31.325v8.5h-5.516a4 4 0 1 0 0 8h5.516v7.7h-11.516a4 4 0 0 0 0 8h11.516v7.7h-5.516a4 4 0 0 0 0 8h5.516V174.9h-25.29a5.7 5.7 0 0 1-5.7-5.7v-54.462h29.107a1.882 1.882 0 0 1 1.883 1.88zM61.255 181.121a14.757 14.757 0 0 0 7.465-7.068 4.223 4.223 0 0 0-.023-3.63c-1.509-2.94-5.908-2.842-7.033-.112a8.876 8.876 0 0 1-3.823 4.037 3.716 3.716 0 0 0-1.727 4.2l.056.2a3.683 3.683 0 0 0 5.085 2.373zM266.964 157.625h.008a3.991 3.991 0 0 0 .719.068h.009a3.971 3.971 0 0 0 .718-.068h.009c1.826-.339 44.922-8.794 61.182-49.887a63.281 63.281 0 0 0 4.308-23.387V21.036a4 4 0 0 0-4.736-3.932c-.413.077-41.589 7.55-58.731-8.725-.075-.071-.16-.121-.239-.185a3.891 3.891 0 0 0-.319-.247c-.114-.075-.232-.134-.35-.2s-.224-.121-.342-.169a3.937 3.937 0 0 0-.381-.124c-.119-.035-.236-.072-.358-.1s-.258-.035-.388-.047-.251-.026-.377-.026-.251.014-.377.026-.259.022-.388.047-.241.062-.361.1a3.605 3.605 0 0 0-.377.123c-.119.048-.232.111-.347.171a3.781 3.781 0 0 0-.345.193 3.988 3.988 0 0 0-.323.25c-.077.064-.162.113-.236.183-17.108 16.243-58.32 8.8-58.733 8.724a4 4 0 0 0-4.734 3.933v63.32a63.261 63.261 0 0 0 4.308 23.387c16.26 41.093 59.355 49.548 61.181 49.887zM209.475 25.7c11.54 1.518 41.151 3.823 58.221-9.191 17.07 13.014 46.681 10.71 58.221 9.191v58.651a55.289 55.289 0 0 1-3.748 20.443c-13.508 34.143-48.927 43.532-54.473 44.807-5.544-1.274-40.965-10.663-54.474-44.807a55.308 55.308 0 0 1-3.747-20.443z"
            fill="#494456"
            opacity="1"
            data-original="#494456"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export const AvailableBedSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="40%"
      height="40%"
      x="0"
      y="0"
      viewBox="0 0 512 512"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
    >
      <g>
        <path d="M54.44 248.271h403.13v66.25H54.44z" fill="#e8e9ea"></path>
        <path
          d="M430.84 248.271h26.721v66.25H430.84zM54.435 248.267v66.251h151.87c-30.81-19.642-37.422-47.488-35.447-66.251H54.435z"
          style={{ opacity: "0.1", enableBackground: "new" }}
          fill="#000000"
          opacity="1"
        ></path>
        <path
          d="M494.041 226.993h-26.017c-5.776 0-10.459 4.683-10.459 10.459v68.768a8.297 8.297 0 0 1-8.297 8.297H62.732a8.297 8.297 0 0 1-8.297-8.297V180.984c0-5.777-4.683-10.459-10.459-10.459H17.959c-5.776 0-10.459 4.683-10.459 10.459v141.74c0 16.332 13.24 29.573 29.572 29.573h437.855c16.332 0 29.572-13.24 29.572-29.572v-85.272c.001-5.777-4.682-10.46-10.458-10.46z"
          fill="#38648c"
        ></path>
        <path
          d="M167.089 248.816H95.75a18.423 18.423 0 0 1-15.808-8.961l-3.01-5.029a13.785 13.785 0 0 1 0-14.159l3.01-5.029a18.423 18.423 0 0 1 15.808-8.961h71.338a18.425 18.425 0 0 1 15.808 8.961l3.01 5.029a13.785 13.785 0 0 1 0 14.159l-3.01 5.029a18.423 18.423 0 0 1-15.807 8.961z"
          fill="#76b7eb"
        ></path>
        <path
          d="M417.868 400.764H94.132a7.5 7.5 0 0 1 0-15h323.736c4.143 0 7.5 3.358 7.5 7.5s-3.357 7.5-7.5 7.5z"
          fill="#38648c"
        ></path>
        <path d="M68.18 352.301h25.952v72.63H68.18z" fill="#76b7eb"></path>
        <path
          d="M68.18 352.301h25.952v23.03H68.18z"
          style={{ opacity: "0.15", enableBackground: "new" }}
          fill="#000000"
          opacity="1"
        ></path>
        <circle cx="81.16" cy="442.671" r="25.11" fill="#495059"></circle>
        <circle cx="81.16" cy="442.671" r="7.284" fill="#76b7eb"></circle>
        <path d="M417.87 352.301h25.952v72.63H417.87z" fill="#76b7eb"></path>
        <path
          d="M417.87 352.301h25.952v23.03H417.87z"
          style={{ opacity: "0.15", enableBackground: "new" }}
          fill="#000000"
          opacity="1"
        ></path>
        <circle cx="430.84" cy="442.671" r="25.11" fill="#495059"></circle>
        <circle cx="430.84" cy="442.671" r="7.284" fill="#76b7eb"></circle>
        {/* Additional paths omitted for brevity */}
      </g>
    </svg>
  );
};

export const OccupiedRoomSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="40%"
      height="40%"
      viewBox="0 0 512 512"
      style={{ enableBackground: "new 0 0 512 512" }}
    >
      <g>
        <path
          fill="#b7cfe8"
          d="M407.058 125.45h27.099v141.194h-27.099z"
          opacity="1"
        />
        <path
          fill="#fbbd80"
          fillRule="evenodd"
          d="M126.088 273.249a38.211 38.211 0 1 0-38.211-38.211 38.3 38.3 0 0 0 38.211 38.211z"
          opacity="1"
        />
        <path
          fill="#5ccec4"
          fillRule="evenodd"
          d="m425.143 246.66-192.7-21c-58.62-6.406-60.52 72.2-6.52 72.2l228.643-.056v-19.793c0-16.611-12.926-29.565-29.424-31.351z"
          opacity="1"
        />
        <path
          fill="#69a7ff"
          fillRule="evenodd"
          d="M166.964 196.317a18.684 18.684 0 0 1 0 26.362L163.647 226c-14-3.6-23.159-12.019-26.362-26.39l3.288-3.288a18.717 18.717 0 0 1 26.391 0z"
          opacity="1"
        />
        <path
          fill="#b7cfe8"
          fillRule="evenodd"
          d="M158.46 297.853h318.416v27.1H151.288L40.85 261.202l13.493-23.471z"
          opacity="1"
        />
        <path
          fill="#69a7ff"
          d="M7.005 324.953h497.991v27.099H7.005z"
          opacity="1"
        />
        <path
          fill="#69a7ff"
          fillRule="evenodd"
          d="M49.5 422.068a21.317 21.317 0 1 1-21.32 21.316 21.31 21.31 0 0 1 21.32-21.316zm413.036 0a21.317 21.317 0 1 1-21.345 21.316 21.31 21.31 0 0 1 21.345-21.316z"
          opacity="1"
        />
        <path
          fill="#69a7ff"
          d="M346.085 47.299h149.046v107.235H346.085z"
          opacity="1"
        />
        <g fillRule="evenodd">
          <path
            fill="#fbbd80"
            d="M242.025 261.372h86.939a18.286 18.286 0 0 1 18.227 18.228 18.268 18.268 0 0 1-18.227 18.226h-86.939z"
            opacity="1"
          />
          <path
            fill="#69a7ff"
            d="M133.345 67.538h36.2V98.38a18.141 18.141 0 0 1-18.113 18.085 18.135 18.135 0 0 1-18.087-18.085z"
            opacity="1"
          />
          <path
            fill="#f5ad65"
            d="M99.187 235.038a38.172 38.172 0 0 1 32.542-37.786 37.005 37.005 0 0 0-5.641-.425 38.268 38.268 0 0 0-37.3 29.877 38.311 38.311 0 0 0 17.632 41.1l1.219.681a37.944 37.944 0 0 0 18.453 4.762 37.005 37.005 0 0 0 5.641-.425 38.194 38.194 0 0 1-31.805-30.36 37.555 37.555 0 0 1-.737-7.426z"
            opacity="1"
          />
        </g>
      </g>
    </svg>
  );
};

export const HouseKeepingSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="40%"
      height="40%"
      x="0"
      y="0"
      viewBox="0 0 512 512"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
    >
      <g transform="matrix(-1,0,0,1,512,0)">
        <path
          d="M64.698 334.906c-16.814 0-30.446 13.631-30.446 30.446v30.446l152.23 30.446-43.639-91.338H64.698z"
          fill="#ffe2a8"
          data-original="#ffe2a8"
        ></path>
        <path
          d="M13.954 395.798v45.669h128.888l44.654-45.669z"
          fill="#ffa754"
          data-original="#ffa754"
        ></path>
        <path
          d="M508.194 441.467v62.922h-30.446v-83.22z"
          fill="#ff6337"
          data-original="#ff6337"
        ></path>
        <path
          d="M462.525 334.906h-30.446l45.669 106.561h30.446v-60.892c0-25.223-20.446-45.669-45.669-45.669z"
          fill="#9db55f"
          data-original="#9db55f"
        ></path>
        <path
          d="M432.079 334.906H196.123l30.446 106.561h251.179v-60.892c0-25.223-20.446-45.669-45.669-45.669z"
          fill="#b9d171"
          data-original="#b9d171"
        ></path>
        <path
          d="M142.842 334.906h83.726v106.561h-83.726z"
          fill="#dbf4ff"
          data-original="#dbf4ff"
        ></path>
        <path
          d="M19.029 228.345c-8.407 0-15.223 6.816-15.223 15.223v260.821h30.446V243.568c0-8.408-6.816-15.223-15.223-15.223z"
          fill="#ffa754"
          data-original="#ffa754"
        ></path>
        <path
          d="M462.525 180.139H355.964v15.223h106.561c4.197 0 7.612 3.414 7.612 7.611 0 4.197-3.414 7.611-7.612 7.611h-30.446a7.61 7.61 0 0 0-7.611 7.611 7.61 7.61 0 0 0 7.611 7.611h30.446c12.59 0 22.835-10.244 22.835-22.834s-10.244-22.833-22.835-22.833z"
          fill="#4f4f4f"
          data-original="#4f4f4f"
        ></path>
        <path
          d="M317.907 289.237v199.515l-25.24 8.413a7.613 7.613 0 0 0 4.813 14.443l30.444-10.149a7.611 7.611 0 0 0 5.204-7.221V289.237h-15.221z"
          fill="#e18f4e"
          data-original="#e18f4e"
        ></path>
        <path
          d="M378.799 289.237v199.515l-25.24 8.413a7.613 7.613 0 0 0 4.813 14.443l30.444-10.149a7.611 7.611 0 0 0 5.204-7.221V289.237h-15.221z"
          fill="#c27749"
          data-original="#c27749"
        ></path>
        <path
          d="M279.849 143.853a74.99 74.99 0 0 0-30.446-18.52l-20.297 92.863 20.297 82.715a75 75 0 0 0 30.446-18.52V143.853z"
          fill="#ffe2a8"
          data-original="#ffe2a8"
        ></path>
        <path
          d="M173.288 143.853V282.39c20.596 20.596 50.144 26.756 76.115 18.52V125.333c-25.971-8.236-55.519-2.075-76.115 18.52z"
          fill="#fff0d3"
          data-original="#fff0d3"
        ></path>
        <path
          d="M173.288 312.071a7.611 7.611 0 0 1-7.612-7.612V121.784a7.61 7.61 0 0 1 7.612-7.611 7.61 7.61 0 0 1 7.611 7.611V304.46a7.61 7.61 0 0 1-7.611 7.611z"
          fill="#fff0d3"
          data-original="#fff0d3"
        ></path>
        <path
          d="M279.849 312.071a7.61 7.61 0 0 1-7.612-7.612V121.784a7.61 7.61 0 0 1 7.612-7.611 7.61 7.61 0 0 1 7.611 7.611V304.46a7.609 7.609 0 0 1-7.611 7.611z"
          fill="#ffe2a8"
          data-original="#ffe2a8"
        ></path>
        <path
          d="M390.729 61.739c.01-.01-34.764-.005-34.764-.005v75.273c25.219 0 45.669-20.45 45.669-45.669a45.468 45.468 0 0 0-10.905-29.599z"
          fill="#c27749"
          data-original="#c27749"
        ></path>
        <path
          d="M370.061 74.095 321.2 61.739a45.456 45.456 0 0 0-10.905 29.599c0 25.219 20.45 45.669 45.669 45.669 8.403 0 15.223-20.45 15.223-45.669 0-6.099-.396-11.925-1.126-17.243z"
          fill="#e18f4e"
          data-original="#e18f4e"
        ></path>
        <path
          d="m355.964 45.669 14.096 28.426c7.561-2.263 14.69-6.389 20.668-12.356-8.372-9.834-20.84-16.07-34.764-16.07z"
          fill="#60312c"
          data-original="#60312c"
        ></path>
        <path
          d="M355.964 45.669c-13.924 0-26.392 6.236-34.764 16.07 13.234 13.234 32.115 17.359 48.861 12.356-2.263-16.674-7.723-28.426-14.097-28.426z"
          fill="#85453d"
          data-original="#85453d"
        ></path>
        <path
          d="M386.41 15.223c-.871 0-1.718.089-2.548.23.001-.077.011-.152.011-.23C383.873 6.816 377.057 0 368.65 0c-5.298 0-9.959 2.71-12.686 6.815C353.237 2.71 348.576 0 343.278 0c-8.407 0-15.223 6.816-15.223 15.223 0 .078.01.152.011.23-.83-.141-1.678-.23-2.548-.23-8.407 0-15.223 6.816-15.223 15.223s6.816 15.223 15.223 15.223h60.892c8.407 0 15.223-6.816 15.223-15.223s-6.816-15.223-15.223-15.223z"
          fill="#85453d"
          data-original="#85453d"
        ></path>
        <path
          d="M371.187 395.798h45.669v-45.669l-76.115-30.446z"
          fill="#4f4f4f"
          data-original="#4f4f4f"
        ></path>
        <path
          d="M310.295 350.129v45.669h60.892v-76.115z"
          fill="#696969"
          data-original="#696969"
        ></path>
        <path
          d="M381.336 167.453h-2.537L350.89 274.014l50.743-53.28V187.75c0-11.21-9.087-20.297-20.297-20.297z"
          fill="#4f4f4f"
          data-original="#4f4f4f"
        ></path>
        <path
          d="m348.353 167.453-7.611 10.149-7.612-10.149h-2.537c-11.21 0-20.297 9.087-20.297 20.297v32.983l60.892 53.28-7.612-106.561h-15.223z"
          fill="#696969"
          data-original="#696969"
        ></path>
        <path
          d="M401.633 258.791v-22.834c-16.816 0-30.446-21.241-30.446-38.057l-30.446 101.147 30.446 51.083h45.669v-51.083c0-15.439-5.755-29.524-15.223-40.256z"
          fill="#a8e5ff"
          data-original="#a8e5ff"
        ></path>
        <path
          d="M348.353 197.899v-30.446H333.13v30.446c0 12.59-10.244 22.834-22.834 22.834v129.395h60.892v-152.23h-22.835z"
          fill="#dbf4ff"
          data-original="#dbf4ff"
        ></path>
        <path
          d="M401.633 235.956c-20.985 0-38.057-17.072-38.057-38.057v-30.446h15.223v30.446c0 12.59 10.244 22.834 22.835 22.834v15.223z"
          fill="#a8e5ff"
          data-original="#a8e5ff"
        ></path>
        <path
          d="M188.511 195.362h-30.446a7.61 7.61 0 0 1-7.611-7.611 7.61 7.61 0 0 1 7.611-7.611h30.446a7.61 7.61 0 0 1 7.611 7.611 7.61 7.61 0 0 1-7.611 7.611z"
          fill="#e18f4e"
          data-original="#e18f4e"
        ></path>
      </g>
    </svg>
  );
};

export const TodayAdmissionSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="40%"
      height="40%"
      x="0"
      y="0"
      viewBox="0 0 128 128"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
      className="hovered-paths"
    >
      <g>
        <path
          fill="#ffdb80"
          d="M124 81v21H4V81a3.035 3.035 0 0 1 3.06-3h113.88a3.035 3.035 0 0 1 3.06 3z"
          opacity="1"
          data-original="#ffdb80"
        ></path>
        <path
          fill="#fc785e"
          d="M85.75 48.86v15.46H42.39s-.38-.38-.38-11.91C42.01 40.87 52.15 41 52.15 41h2.23a16.88 16.88 0 0 0 19.24 0H77c7.86 0 8.75 7.86 8.75 7.86z"
          opacity="1"
          data-original="#fc785e"
          className=""
        ></path>
        <path
          fill="#2d4356"
          d="M64 14a13 13 0 1 0 13 13 13.012 13.012 0 0 0-13-13zm0 22a9 9 0 1 1 9-9 9.014 9.014 0 0 1-9 9z"
          opacity="1"
          data-original="#2d4356"
          className="hovered-path"
        ></path>
        <path
          fill="#e1ebf4"
          d="M73 27a9 9 0 1 1-9-9 9.014 9.014 0 0 1 9 9z"
          opacity="1"
          data-original="#e1ebf4"
        ></path>
        <path
          fill="#2d4356"
          d="M126 56h-4v-4a2 2 0 0 0-4 0v4h-4a2 2 0 0 0 0 4h4v4a2 2 0 0 0 4 0v-4h4a2 2 0 0 0 0-4zM2 60h4v4a2 2 0 0 0 4 0v-4h4a2 2 0 0 0 0-4h-4v-4a2 2 0 0 0-4 0v4H2a2 2 0 0 0 0 4z"
          opacity="1"
          data-original="#2d4356"
          className="hovered-path"
        ></path>
        <path
          fill="#9387a2"
          d="M49.18 35.3a16.167 16.167 0 0 0-8.73 4.7 14.982 14.982 0 0 0-1.65 2c-.23.33-.45.68-.66 1.03H2.13V29c0-5.58 3.55-5.24 3.55-5.24l41.61.18c0 .02-.01.04-.01.06l-.09.56c-.03.18-.05.36-.07.54-.04.3-.07.6-.08.9-.03.33-.04.66-.04 1s.01.67.04 1a16.803 16.803 0 0 0 2.14 7.3zM125.34 25.79v17.24H89.86c-.21-.35-.43-.7-.66-1.03a14.982 14.982 0 0 0-1.65-2 16.167 16.167 0 0 0-8.73-4.7 16.803 16.803 0 0 0 2.14-7.3c.03-.33.04-.66.04-1s-.01-.67-.04-1a7.901 7.901 0 0 0-.08-.85 3.52 3.52 0 0 0-.04-.34c-.03-.24-.07-.48-.11-.72h.01l40.71.18z"
          opacity="1"
          data-original="#9387a2"
        ></path>
        <path
          fill="#2d4356"
          d="M120.94 74H107V64a2.006 2.006 0 0 0-2-2H88V50.83a12.001 12.001 0 0 0-11.98-11.82A17.085 17.085 0 0 1 69.69 43h6.16A8.005 8.005 0 0 1 84 50.83V62H44V50.83A8.005 8.005 0 0 1 52.15 43h6.16a17.085 17.085 0 0 1-6.33-3.99A12.001 12.001 0 0 0 40 50.83V62H23a2.006 2.006 0 0 0-2 2v10H7.06A7.04 7.04 0 0 0 0 81v23a2.006 2.006 0 0 0 2 2h10v6a2.006 2.006 0 0 0 2 2h10a2.006 2.006 0 0 0 2-2v-6h76v6a2.006 2.006 0 0 0 2 2h10a2.006 2.006 0 0 0 2-2v-6h10a2.006 2.006 0 0 0 2-2V81a7.04 7.04 0 0 0-7.06-7zM25 66h78v8H25zm-3 44h-6v-4h6zm90 0h-6v-4h6zm12-8H4V81a3.035 3.035 0 0 1 3.06-3h113.88a3.035 3.035 0 0 1 3.06 3z"
          opacity="1"
          data-original="#2d4356"
          className="hovered-path"
        ></path>
        <path
          fill="#d68751"
          d="M106 106h6v4h-6zM16 106h6v4h-6z"
          opacity="1"
          data-original="#d68751"
        ></path>
        <path
          fill="#81d9e3"
          d="M25 66h78v8H25z"
          opacity="1"
          data-original="#81d9e3"
          className=""
        ></path>
        <g fill="#2d4356">
          <circle
            cx="64"
            cy="47"
            r="2"
            fill="#2d4356"
            opacity="1"
            data-original="#2d4356"
            className="hovered-path"
          ></circle>
          <circle
            cx="64"
            cy="55"
            r="2"
            fill="#2d4356"
            opacity="1"
            data-original="#2d4356"
            className="hovered-path"
          ></circle>
          <path
            d="M2 46h34.776a15.621 15.621 0 0 1 1.978-4H4V28a2.003 2.003 0 0 1 2-2h41.05a16.914 16.914 0 0 1 .703-4H6a6.007 6.007 0 0 0-6 6v16a2 2 0 0 0 2 2zM122 22H80.247a16.914 16.914 0 0 1 .702 4H122a2.003 2.003 0 0 1 2 2v14H89.246a15.621 15.621 0 0 1 1.978 4H126a2 2 0 0 0 2-2V28a6.007 6.007 0 0 0-6-6z"
            fill="#2d4356"
            opacity="1"
            data-original="#2d4356"
            className="hovered-path"
          ></path>
        </g>
        <path
          fill="#f9edd250"
          d="M124 81v2a3.035 3.035 0 0 0-3.06-3H7.06A3.035 3.035 0 0 0 4 83v-2a3.035 3.035 0 0 1 3.06-3h113.88a3.035 3.035 0 0 1 3.06 3z"
          opacity="1"
          data-original="#f9edd250"
        ></path>
        <path
          fill="#5f596850"
          d="M40.45 40a14.982 14.982 0 0 0-1.65 2H4v-2zM124 40v2H89.2a14.982 14.982 0 0 0-1.65-2z"
          opacity="1"
          data-original="#5f596850"
        ></path>
        <path
          fill="#fff"
          d="M73 27a8.267 8.267 0 0 1-.06 1 8.995 8.995 0 0 0-17.88 0 8.267 8.267 0 0 1-.06-1 9 9 0 0 1 18 0z"
          opacity=".5"
        ></path>
        <path
          fill="#9fa5aa"
          d="M73 27a9 9 0 0 1-18 0 8.265 8.265 0 0 1 .06-1 8.995 8.995 0 0 0 17.88 0 8.265 8.265 0 0 1 .06 1z"
          opacity=".5"
        ></path>
        <path fill="#ad9359" d="M4 100h120v2H4z" opacity=".45"></path>
        <path
          fill="#f9dbd7"
          d="M84 50.83v2A8.005 8.005 0 0 0 75.85 45h-23.7A8.005 8.005 0 0 0 44 52.83v-2A8.005 8.005 0 0 1 52.15 43h6.1a17.031 17.031 0 0 0 11.5 0h6.1A8.005 8.005 0 0 1 84 50.83z"
          opacity=".3"
        ></path>
        <path
          fill="#dccef2"
          d="M47.04 26c-.03.33-.04.66-.04 1s.01.67.04 1H6a2.006 2.006 0 0 0-2 2v-2a2.006 2.006 0 0 1 2-2zM47.28 24l-.09.56c.02-.19.05-.37.08-.56zM80.74 24.09c.04.24.08.48.1.72-.03-.24-.07-.48-.11-.72zM124 28v2a2.006 2.006 0 0 0-2-2H80.96c.03-.33.04-.66.04-1s-.01-.67-.04-1H122a2.006 2.006 0 0 1 2 2z"
          opacity=".2"
        ></path>
        <path fill="#e8fbfc" d="M25 66h78v2H25z" opacity=".4"></path>
      </g>
    </svg>
  );
};

export const TodayDischargeSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="40%"
      height="40%"
      x="0"
      y="0"
      viewBox="0 0 60 60"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
    >
      <g>
        <path
          fill="#9e9e9e"
          d="M7 56a2.772 2.772 0 0 1-.18 1A3 3 0 0 1 1 56a2.94 2.94 0 0 1 1-2.23A2.965 2.965 0 0 1 4 53a3 3 0 0 1 3 3zM59 56a3 3 0 0 1-5.82 1 2.772 2.772 0 0 1-.18-1 3 3 0 0 1 3-3 3.011 3.011 0 0 1 3 3z"
          opacity="1"
          data-original="#9e9e9e"
        ></path>
        <path
          fill="#7f8e94"
          d="M6 25v28H4a2.965 2.965 0 0 0-2 .77V25a2.015 2.015 0 0 1 2-2 2.006 2.006 0 0 1 2 2zM58 32v21.77a2.965 2.965 0 0 0-2-.77h-2V32a2.015 2.015 0 0 1 2-2 2.006 2.006 0 0 1 2 2z"
          opacity="1"
          data-original="#7f8e94"
        ></path>
        <path
          fill="#f5f5f5"
          d="M6 37h16v12H6z"
          opacity="1"
          data-original="#f5f5f5"
        ></path>
        <path
          fill="#cfd8dc"
          d="M19 37h3v12h-3z"
          opacity="1"
          data-original="#cfd8dc"
        ></path>
        <path
          fill="#607d8b"
          d="M6 49h48v4H6z"
          opacity="1"
          data-original="#607d8b"
        ></path>
        <path
          fill="#37474f"
          d="M51 49h3v4h-3z"
          opacity="1"
          data-original="#37474f"
        ></path>
        <path
          fill="#7f8e94"
          d="M53 56a2.772 2.772 0 0 0 .18 1H6.82A2.772 2.772 0 0 0 7 56a3 3 0 0 0-3-3h52a3 3 0 0 0-3 3z"
          opacity="1"
          data-original="#7f8e94"
        ></path>
        <path
          fill="#545c60"
          d="M56 53h-3a3 3 0 0 0-3 3 2.772 2.772 0 0 0 .18 1h3a2.772 2.772 0 0 1-.18-1 3 3 0 0 1 3-3z"
          opacity="1"
          data-original="#545c60"
        ></path>
        <path
          fill="#00bcd4"
          d="M18 33v4H6v-6h10a2.006 2.006 0 0 1 2 2zM54 35v14H22V37a2.006 2.006 0 0 1 2-2z"
          opacity="1"
          data-original="#00bcd4"
        ></path>
        <path
          fill="#00838f"
          d="M51 35h3v14h-3z"
          opacity="1"
          data-original="#00838f"
        ></path>
        <path
          fill="#ffdf00"
          d="M58.2 17.79 43.948 30.4A2.377 2.377 0 0 1 40 28.609V21c-11.889 0-18.106 3.49-20.957 5.86a1.1 1.1 0 0 1-1.793-1.006C18.707 16.86 26.531 10 40 10V3.391A2.377 2.377 0 0 1 43.948 1.6L58.2 14.21a2.4 2.4 0 0 1 0 3.58z"
          opacity="1"
          data-original="#ffdf00"
        ></path>
        <path
          fill="#fec108"
          d="M58.2 14.21 43.948 1.6a2.354 2.354 0 0 0-3.074-.057c.024.02.05.035.074.057L55.2 14.21a2.4 2.4 0 0 1 0 3.58L40.948 30.4c-.024.022-.05.037-.074.057a2.354 2.354 0 0 0 3.074-.057L58.2 17.79a2.4 2.4 0 0 0 0-3.58z"
          opacity="1"
          data-original="#fec108"
        ></path>
        <path
          d="M59 32a3 3 0 0 0-6 0v2H24a3 3 0 0 0-2.816 2H19v-3a3 3 0 0 0-3-3H7v-5a3 3 0 0 0-6 0v28.382A3.984 3.984 0 1 0 7.444 58h45.112A3.985 3.985 0 1 0 59 53.382zm-3-1a1 1 0 0 1 1 1v20.142A7.09 7.09 0 0 0 55 52V32a1.008 1.008 0 0 1 1-1zm-35 7v10H7V38zM7 50h46v2H7zm17-14h29v12H23V37a1 1 0 0 1 1-1zm-8-4a1 1 0 0 1 1 1v3H7v-4zM4 24a1 1 0 0 1 1 1v27a7.09 7.09 0 0 0-2 .142V25a1.008 1.008 0 0 1 1-1zm0 34a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm4-2a3.959 3.959 0 0 0-.556-2h45.112A3.959 3.959 0 0 0 52 56zm48 2a2 2 0 1 1 2-2 2 2 0 0 1-2 2z"
          fill="#000000"
          opacity="1"
          data-original="#000000"
        ></path>
        <path
          d="M44.612.854A3.327 3.327 0 0 0 41 .3a3.349 3.349 0 0 0-2 3.09v5.623c-12.439.321-21.111 6.65-22.736 16.681a2.064 2.064 0 0 0 1.026 2.14 2.088 2.088 0 0 0 2.392-.2c2.456-2.047 8.19-5.434 19.318-5.625v6.6a3.378 3.378 0 0 0 5.612 2.539L58.86 18.539a3.4 3.4 0 0 0 0-5.077zm12.922 16.188-14.25 12.61a1.328 1.328 0 0 1-1.466.222A1.353 1.353 0 0 1 41 28.609V21a1 1 0 0 0-1-1c-12.414 0-18.859 3.815-21.6 6.091-.019.014-.056.044-.165-.076C19.737 16.753 28.076 11 40 11a1 1 0 0 0 1-1V3.391a1.353 1.353 0 0 1 .819-1.265 1.329 1.329 0 0 1 1.468.224l14.247 12.608a1.4 1.4 0 0 1 0 2.084z"
          fill="#000000"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  );
};

export const BedSVG = ({ fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="5%"
      height="5%"
      x="0"
      y="0"
      viewBox="0 0 50 50"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
    >
      <g>
        <path
          fill={fill}
          d="m48.718 27.1-.43-.25a.542.542 0 0 0-.29-.06c-.03-.05-.07-.09-.11-.13v-.53c.02-.01.05-.02.07-.03.16-.09.24-.21.24-.33l.01-4.07c0 .04-.02.08-.04.12.05-.11.03-.22-.05-.33l-.01-.59-.01-.01.02-7.56c.01-1.7-1.18-3.76-2.66-4.61l-8.88-5.13c-.74-.42-1.41-.47-1.9-.18l-.86.5c-.48.28-.78.87-.78 1.71v1.24l-7.32 8.01.02.42-15.63 9.03-4.72-2.73c-.74-.42-1.41-.47-1.9-.18l-.86.5c-.48.28-.78.87-.78 1.71l-.02 7.57V31.66l-.02 4.07c0 .12.08.24.24.33.04.03.09.04.13.05v.18c-.07.03-.15.04-.23.08-.52.3-.95 1.04-.95 1.66 0 .29.11.51.28.61l.44.25c.08.05.18.06.28.06.05.08.1.15.17.2l.44.25c.18.1.42.09.68-.06.53-.31.96-1.05.96-1.66 0-.3-.11-.51-.29-.61l-.43-.26a.518.518 0 0 0-.28-.05.302.302 0 0 0-.12-.13v-.54c.03-.01.06-.01.08-.03.16-.09.23-.21.23-.33l.01-2.59 11.82 6.82v3.08c0 .12.07.24.23.33.04.02.09.03.13.05v.18c-.07.02-.15.03-.23.08-.52.3-.95 1.04-.94 1.65 0 .3.1.51.27.61l.44.26c.08.04.18.06.28.06.05.08.1.15.17.19l.45.26c.17.1.41.08.67-.07.53-.3.96-1.04.96-1.65 0-.31-.11-.52-.29-.62l-.43-.25a.609.609 0 0 0-.28-.06.494.494 0 0 0-.12-.13v-.53c.03-.01.06-.02.08-.03.16-.09.24-.21.24-.33v-3.1l3.44-1.98v1.43l.52.31 23.45-13.63v-1.95l2.27-1.31-.01 2.95c0 .13.08.25.24.34.03.02.08.03.13.05v.18c-.08.02-.15.03-.23.08-.53.3-.96 1.04-.95 1.65 0 .3.1.51.27.61l.44.26c.08.04.18.06.29.05.04.08.09.16.17.2l.44.25c.17.11.41.09.68-.06.53-.31.95-1.04.95-1.65 0-.31-.11-.52-.28-.62zm-41.85-.91-.17-.1c-.36-.2-.65-.68-.71-1.12l1.49.87zM37.888 8.1c-.36-.21-.65-.69-.71-1.12l6.09 3.51c.36.21.66.69.72 1.12z"
          opacity="1"
          data-original={fill}
        ></path>
        <path
          fill="#5b5e71"
          d="M47.826 26.594c-.175-.1-.411-.087-.68.069-.53.3-.953 1.04-.953 1.652 0 .299.106.51.28.61l-.442-.255c-.169-.1-.275-.312-.275-.61-.006-.612.424-1.354.948-1.653.268-.156.511-.168.686-.068z"
          opacity="1"
          data-original="#5b5e71"
        ></path>
        <path
          fill="#474b59"
          d="M47.145 26.66c.53-.305.96-.06.962.549.002.608-.426 1.345-.956 1.65-.525.304-.956.063-.958-.545-.002-.608.427-1.35.952-1.654z"
          opacity="1"
          data-original="#474b59"
        ></path>
        <path
          fill={fill}
          d="M47.145 26.751c.486-.28.882-.055.883.503.002.558-.391 1.234-.877 1.515-.482.278-.877.057-.879-.5-.001-.559.392-1.24.874-1.518z"
          opacity="1"
          data-original={fill}
        ></path>
        <path
          fill="#5b5e71"
          d="M47.149 27.471c.139-.08.252-.015.252.144s-.112.353-.25.433c-.138.08-.252.017-.252-.143 0-.16.112-.354.25-.434z"
          opacity="1"
          data-original="#5b5e71"
        ></path>
        <path
          fill="#cad0dd"
          d="m46.932 25.265.01 3.486.232.135-.01-3.486z"
          opacity="1"
          data-original="#cad0dd"
        ></path>
        <path
          fill="#bac1ce"
          d="m47.164 25.4.01 3.486.717-.414-.01-3.486z"
          opacity="1"
          data-original="#bac1ce"
        ></path>
        <path
          fill="#474b59"
          d="m46.932 25.265.232.135.717-.414-.232-.135z"
          opacity="1"
          data-original="#474b59"
        ></path>
        <path
          fill="#5b5e71"
          d="m48.209 21.703-.012 4.066c0 .12-.078.239-.234.33-.316.183-.84.183-1.158 0-.16-.092-.238-.214-.238-.335l.011-4.065c0 .121.079.242.238.334.319.184.842.184 1.159 0 .156-.09.234-.21.234-.33z"
          opacity="1"
          data-original="#5b5e71"
        ></path>
        <path
          fill="#5b5e71"
          d="M47.967 21.364c.318.184.324.485.008.67-.317.183-.84.183-1.159 0s-.316-.486 0-.67c.317-.183.832-.183 1.15 0zM48.72 27.104c-.174-.1-.411-.087-.68.069-.53.299-.953 1.04-.953 1.652 0 .299.106.51.28.61l-.442-.255c-.169-.1-.275-.312-.275-.611-.006-.611.424-1.353.948-1.652.268-.156.511-.168.686-.069z"
          opacity="1"
          data-original="#5b5e71"
        ></path>
        <path
          fill="#474b59"
          d="M48.04 27.17c.529-.306.96-.06.962.548.001.609-.427 1.346-.957 1.652-.525.303-.956.062-.958-.546-.002-.609.427-1.35.952-1.654z"
          opacity="1"
          data-original="#474b59"
        ></path>
        <path
          fill={fill}
          d="M48.04 27.261c.485-.28.88-.055.882.503.002.558-.391 1.234-.877 1.515-.482.278-.877.057-.879-.501-.001-.558.392-1.239.874-1.517z"
          opacity="1"
          data-original={fill}
        ></path>
        <path
          fill="#5b5e71"
          d="M48.043 27.981c.139-.08.252-.016.253.144a.55.55 0 0 1-.251.433c-.138.08-.251.017-.252-.143 0-.16.112-.354.25-.434zM16.523 43.867c-.174-.1-.411-.088-.68.068-.53.3-.953 1.041-.953 1.652 0 .3.106.511.28.611l-.442-.256c-.169-.1-.275-.311-.275-.61-.006-.611.424-1.353.948-1.652.268-.156.511-.169.686-.069z"
          opacity="1"
          data-original="#5b5e71"
        ></path>
        <path
          fill="#474b59"
          d="M15.842 43.933c.53-.306.96-.06.962.548.002.608-.426 1.346-.956 1.651-.525.304-.956.063-.958-.546-.002-.608.427-1.35.952-1.653z"
          opacity="1"
          data-original="#474b59"
        ></path>
        <path
          fill={fill}
          d="M15.843 44.023c.485-.28.88-.055.883.504.001.558-.392 1.234-.878 1.514-.482.279-.877.058-.879-.5-.001-.559.392-1.24.874-1.517z"
          opacity="1"
          data-original={fill}
        ></path>
        <path
          fill="#5b5e71"
          d="M15.846 44.744c.139-.08.252-.016.253.144a.55.55 0 0 1-.251.433c-.138.08-.251.016-.252-.143 0-.16.112-.355.25-.434z"
          opacity="1"
          data-original="#5b5e71"
        ></path>
        <path
          fill="#cad0dd"
          d="m15.629 42.537.01 3.486.232.135-.01-3.486z"
          opacity="1"
          data-original="#cad0dd"
        ></path>
        <path
          fill="#bac1ce"
          d="m15.861 42.672.01 3.486.717-.414-.01-3.486z"
          opacity="1"
          data-original="#bac1ce"
        ></path>
        <path
          fill="#474b59"
          d="m15.629 42.537.232.135.717-.414-.232-.135z"
          opacity="1"
          data-original="#474b59"
        ></path>
        <path
          fill="#5b5e71"
          d="m16.906 38.976-.011 4.065c0 .12-.078.24-.235.33-.316.184-.84.184-1.158 0-.16-.092-.238-.213-.238-.335l.011-4.065c0 .122.08.243.238.335.319.184.843.184 1.159 0 .156-.091.234-.21.234-.33z"
          opacity="1"
          data-original="#5b5e71"
        ></path>
        <path
          fill="#5b5e71"
          d="M16.664 38.637c.319.184.324.485.008.669-.316.183-.84.183-1.158 0s-.316-.485 0-.67c.316-.183.832-.183 1.15 0zM17.417 44.376c-.174-.1-.411-.087-.68.07-.53.298-.953 1.04-.953 1.651 0 .3.106.511.28.61l-.442-.255c-.168-.1-.274-.311-.274-.61-.007-.612.424-1.353.947-1.653.268-.155.511-.168.686-.068z"
          opacity="1"
          data-original="#5b5e71"
        ></path>
        <path
          fill="#474b59"
          d="M16.736 44.443c.53-.306.961-.06.963.548.001.608-.427 1.346-.956 1.651-.526.303-.957.062-.959-.546-.001-.608.427-1.35.952-1.653z"
          opacity="1"
          data-original="#474b59"
        ></path>
        <path
          fill={fill}
          d="M16.737 44.533c.485-.28.881-.055.883.503.001.558-.392 1.235-.878 1.515-.481.278-.877.057-.879-.5-.001-.559.392-1.24.874-1.518z"
          opacity="1"
          data-original={fill}
        ></path>
        <path
          fill="#5b5e71"
          d="M16.74 45.254c.14-.08.252-.016.253.144a.55.55 0 0 1-.251.433c-.138.08-.251.016-.251-.144-.001-.16.111-.354.25-.433zM3.071 36.56c-.174-.1-.411-.087-.68.07-.53.298-.953 1.04-.953 1.651 0 .3.106.511.28.611l-.442-.256c-.168-.1-.274-.311-.274-.61-.007-.611.423-1.353.947-1.652.268-.156.511-.169.686-.069z"
          opacity="1"
          data-original="#5b5e71"
        ></path>
        <path
          fill="#474b59"
          d="M2.39 36.627c.53-.306.96-.06.963.548.001.608-.427 1.346-.957 1.651-.525.304-.956.062-.958-.546-.002-.608.427-1.35.952-1.653z"
          opacity="1"
          data-original="#474b59"
        ></path>
        <path
          fill={fill}
          d="M2.39 36.717c.486-.28.882-.055.883.503.002.558-.391 1.235-.877 1.515-.482.278-.877.057-.879-.5-.001-.559.392-1.24.874-1.518z"
          opacity="1"
          data-original={fill}
        ></path>
        <path
          fill="#5b5e71"
          d="M2.394 37.438c.139-.08.252-.016.253.144a.55.55 0 0 1-.251.433c-.138.08-.251.016-.252-.143 0-.16.112-.355.25-.434z"
          opacity="1"
          data-original="#5b5e71"
        ></path>
        <path
          fill="#cad0dd"
          d="m2.177 35.23.01 3.487.232.135-.01-3.486z"
          opacity="1"
          data-original="#cad0dd"
        ></path>
        <path
          fill="#bac1ce"
          d="m2.41 35.366.01 3.486.716-.414-.01-3.486z"
          opacity="1"
          data-original="#bac1ce"
        ></path>
        <path
          fill="#474b59"
          d="m2.177 35.23.232.136.717-.414-.232-.135z"
          opacity="1"
          data-original="#474b59"
        ></path>
        <path
          fill="#5b5e71"
          d="m3.454 31.67-.011 4.065c0 .12-.078.239-.235.33-.316.184-.84.184-1.158 0-.16-.092-.238-.213-.238-.335l.011-4.065c0 .121.08.243.238.335.319.183.843.183 1.159 0 .156-.091.234-.21.234-.33z"
          opacity="1"
          data-original="#5b5e71"
        ></path>
        <path
          fill="#5b5e71"
          d="M3.212 31.33c.319.185.324.486.008.67-.316.183-.84.183-1.159 0s-.316-.485 0-.67c.317-.183.833-.183 1.151 0zM3.965 37.07c-.174-.1-.411-.087-.68.069-.529.3-.953 1.041-.953 1.652 0 .3.106.511.28.61l-.442-.255c-.168-.1-.274-.312-.274-.61-.007-.612.424-1.353.947-1.653.268-.155.511-.168.686-.068z"
          opacity="1"
          data-original="#5b5e71"
        ></path>
        <path
          fill="#474b59"
          d="M3.284 37.136c.53-.305.961-.06.963.549.001.608-.427 1.345-.956 1.651-.526.303-.957.062-.959-.546-.001-.608.427-1.35.952-1.654z"
          opacity="1"
          data-original="#474b59"
        ></path>
        <path
          fill={fill}
          d="M3.285 37.227c.485-.28.881-.055.883.503.001.558-.392 1.235-.877 1.515-.482.279-.878.057-.88-.5-.001-.559.392-1.24.874-1.518z"
          opacity="1"
          data-original={fill}
        ></path>
        <path
          fill="#5b5e71"
          d="M3.288 37.947c.14-.08.252-.015.253.144a.55.55 0 0 1-.251.434c-.138.08-.251.016-.252-.144 0-.16.112-.354.25-.434z"
          opacity="1"
          data-original="#5b5e71"
        ></path>
        <path
          fill="#474b59"
          d="m20.867 37.607 23.445-13.625-.006 2.089-23.445 13.625zM20.34 37.302l23.445-13.624.527.304-23.445 13.625z"
          opacity="1"
          data-original="#474b59"
        ></path>
        <path
          fill="#5b5e71"
          d="m20.867 37.607-.006 2.089-.527-.305.006-2.089z"
          opacity="1"
          data-original="#5b5e71"
        ></path>
        <path
          fill="#cad0dd"
          d="m1.827 31.193.011 1.017 14.238 8.21-.011-1.017z"
          opacity="1"
          data-original="#cad0dd"
        ></path>
        <path
          fill="#bac1ce"
          d="m16.065 39.403.011 1.017 32.045-18.502-.011-1.016z"
          opacity="1"
          data-original="#bac1ce"
        ></path>
        <path
          fill="#d4dae8"
          d="m1.996 31.227 14.069 8.176L48.11 20.902l-14.238-8.21z"
          opacity="1"
          data-original="#d4dae8"
        ></path>
        <g fill={fill}>
          <path
            d="m48.121 13.329-.024 7.572-.857.502.018-7.572c.006-1.696-1.188-3.759-2.663-4.61l-8.882-5.13c-.741-.428-1.408-.465-1.898-.183l.863-.502c.49-.282 1.157-.239 1.898.184l8.882 5.13c1.476.85 2.67 2.914 2.663 4.609z"
            fill={fill}
            opacity="1"
            data-original={fill}
          ></path>
          <path
            d="M44.638 11.756c-.771.366-.876.73-1.377.44l-6.232-3.599c-.41-.232-.74-.814-.74-1.28 0-.226.079-.391.207-.47l.013-.007h.006l.826-.483c-.116.085-.19.244-.19.459 0 .465.331 1.047.741 1.28l6.232 3.599c.202.116.386.134.514.06z"
            fill={fill}
            opacity="1"
            data-original={fill}
          ></path>
        </g>
        <path
          fill="#cad0dd"
          d="M44.594 9.22c1.477.853 2.669 2.913 2.664 4.61l-.021 7.572-14.219-8.209.021-7.571c.005-1.698 1.205-2.377 2.675-1.529zm-.808 3.029c.134-.076.224-.24.225-.473.001-.476-.334-1.048-.744-1.285l-6.234-3.599c-.203-.117-.391-.131-.525-.05-.137.073-.22.241-.22.475-.001.467.334 1.047.74 1.282 6.21 3.496 6.386 3.888 6.758 3.65"
          opacity="1"
          data-original="#cad0dd"
        ></path>
        <path
          fill="#576cfb"
          d="M16.968 36.32 3.187 28.312l.008 2.19 13.781 8.009z"
          opacity="1"
          data-original="#576cfb"
        ></path>
        <path
          fill="#9ad898"
          d="m46.892 19.044-13.781-8.01L3.187 28.313l13.78 8.008z"
          opacity="1"
          data-original="#9ad898"
        ></path>
        <g fill={fill}>
          <path
            d="m16.93 31.328-.024 7.573-.857.502.018-7.572c.006-1.696-1.188-3.759-2.663-4.61l-8.882-5.13c-.741-.428-1.408-.465-1.898-.183l.863-.502c.49-.282 1.157-.239 1.898.183l8.882 5.13c1.476.851 2.67 2.914 2.663 4.61z"
            fill={fill}
            opacity="1"
            data-original={fill}
          ></path>
          <path
            d="M13.447 29.755c-.771.366-.876.73-1.377.441l-6.232-3.6c-.41-.232-.74-.813-.74-1.279 0-.226.079-.392.207-.471l.013-.006h.006l.826-.484c-.116.086-.19.245-.19.46 0 .465.331 1.046.741 1.279l6.232 3.6c.202.116.385.134.514.06z"
            fill={fill}
            opacity="1"
            data-original={fill}
          ></path>
        </g>
        <path
          fill="#cad0dd"
          d="M13.403 27.22c1.477.852 2.669 2.912 2.664 4.61l-.021 7.572-14.219-8.21.021-7.57c.005-1.699 1.205-2.378 2.675-1.53zm-.808 3.029c.134-.076.224-.24.225-.474.001-.476-.334-1.047-.744-1.284l-6.234-3.6c-.203-.116-.391-.13-.524-.05-.138.074-.22.242-.221.475-.001.468.334 1.048.74 1.283l6.234 3.599c.207.12.395.133.524.05"
          opacity="1"
          data-original="#cad0dd"
        ></path>
        <path
          fill="#75ca75"
          d="M39.499 22.875 25.72 14.868l.015.425 13.778 8.008z"
          opacity="1"
          data-original="#75ca75"
        ></path>
        <path
          fill="#9ad898"
          d="M46.874 14.8 33.095 6.793l-7.375 8.075L39.5 22.875z"
          opacity="1"
          data-original="#9ad898"
        ></path>
        <path
          fill="#6eba6e"
          d="M46.9 21.23 16.98 38.51l-.01-2.19L39.51 23.3l-.01-.42 7.37-8.08.02 4.24z"
          opacity="1"
          data-original="#6eba6e"
        ></path>
      </g>
    </svg>
  );
};

export const ClockSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="17"
      height="17"
      x="0"
      y="0"
      viewBox="0 0 64 64"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
    >
      <g>
        <g data-name="20-Alarm Clock">
          <circle
            cx="32"
            cy="35"
            r="20"
            fill="#f2f6fc"
            opacity="1"
            data-original="#f2f6fc"
          ></circle>
          <circle
            cx="32"
            cy="35"
            r="13"
            fill="#e9edf5"
            opacity="1"
            data-original="#e9edf5"
          ></circle>
          <path
            fill="#d99668"
            d="m51 53 5 10h-4l-6.65-5.7a25.107 25.107 0 0 0 5.52-4.43zM13.13 52.87a25.107 25.107 0 0 0 5.52 4.43L12 63H8l5-10z"
            opacity="1"
            data-original="#d99668"
          ></path>
          <path
            fill="#cdd2e1"
            d="m3 4 2 2a9.975 9.975 0 0 0-2 2L1 6zM63 6l-2 2a9.975 9.975 0 0 0-2-2l2-2zM37 1a2.006 2.006 0 0 1 2 2 1.955 1.955 0 0 1-.59 1.41A1.955 1.955 0 0 1 37 5H27a2.006 2.006 0 0 1-2-2 1.955 1.955 0 0 1 .59-1.41A1.955 1.955 0 0 1 27 1z"
            opacity="1"
            data-original="#cdd2e1"
          ></path>
          <path
            fill="#7e8596"
            d="M34 5v4.08c-.66-.05-1.33-.08-2-.08s-1.34.03-2 .08V5zM13 12l2.73 2.73a25.221 25.221 0 0 0-4 4L9 16zM55 16l-2.73 2.73a25.221 25.221 0 0 0-4-4L51 12z"
            opacity="1"
            data-original="#7e8596"
          ></path>
          <path
            fill="#ffc247"
            d="M18.07 6.93 13 12l-4 4-5.07 5.07A10 10 0 1 1 18.07 6.93z"
            opacity="1"
            data-original="#ffc247"
          ></path>
          <path
            fill="#f5cd62"
            d="M3 16a10 10 0 0 1 14.782-8.782l.288-.288A10 10 0 1 0 3.93 21.07l.288-.288A9.947 9.947 0 0 1 3 16z"
            opacity="1"
            data-original="#f5cd62"
          ></path>
          <path
            fill="#ffc247"
            d="M63 14a9.969 9.969 0 0 1-2.93 7.07L55 16l-4-4-5.07-5.07A10 10 0 0 1 63 14z"
            opacity="1"
            data-original="#ffc247"
          ></path>
          <path
            fill="#f5cd62"
            d="M61 8a10 10 0 0 0-15.07-1.07l.288.288a10 10 0 0 1 13.564 13.564l.288.288A10 10 0 0 0 61 8z"
            opacity="1"
            data-original="#f5cd62"
          ></path>
          <path
            fill="#65b1fc"
            d="M30 9.08c.66-.05 1.33-.08 2-.08s1.34.03 2 .08a25.771 25.771 0 0 1 14.27 5.65 25.221 25.221 0 0 1 4 4 25.961 25.961 0 0 1-1.4 34.14 25.107 25.107 0 0 1-5.52 4.43 25.934 25.934 0 0 1-26.7 0 25.107 25.107 0 0 1-5.52-4.43 25.961 25.961 0 0 1-1.4-34.14 25.221 25.221 0 0 1 4-4A25.771 25.771 0 0 1 30 9.08zM52 35a20 20 0 1 0-20 20 19.994 19.994 0 0 0 20-20z"
            opacity="1"
            data-original="#65b1fc"
          ></path>
          <g fill="#afb4c8">
            <path
              d="M31 15h2v4h-2zM31 51h2v4h-2zM48 34h4v2h-4zM12 34h4v2h-4zM42.6 22.982l2.828-2.828 1.414 1.414-2.829 2.828zM17.144 48.432l2.829-2.828 1.414 1.414-2.829 2.828zM42.597 47.015l1.414-1.414 2.83 2.829-1.415 1.414zM17.147 21.562l1.414-1.414 2.828 2.829-1.414 1.414z"
              fill="#afb4c8"
              opacity="1"
              data-original="#afb4c8"
            ></path>
          </g>
          <path
            fill="#cdd2e1"
            d="M34 32.77A2.94 2.94 0 0 1 35 35a3 3 0 0 1-6 0 3 3 0 0 1 5-2.23z"
            opacity="1"
            data-original="#cdd2e1"
          ></path>
          <path
            fill="#d99668"
            d="M34 24v8.77a2.982 2.982 0 0 0-4 0V24a2.006 2.006 0 0 1 2-2 2.015 2.015 0 0 1 2 2zM35 35l5.5 5.5a2.121 2.121 0 0 1-3 3L32 38a3 3 0 0 0 3-3z"
            opacity="1"
            data-original="#d99668"
          ></path>
          <path
            fill="#4a98f7"
            d="M32 11a24 24 0 1 0 24 24 24 24 0 0 0-24-24zm0 44a20 20 0 1 1 20-20 20 20 0 0 1-20 20z"
            opacity="1"
            data-original="#4a98f7"
          ></path>
          <path
            d="M32 14a21 21 0 1 0 21 21 21.024 21.024 0 0 0-21-21zm18.949 22A18.892 18.892 0 0 1 46.1 47.688l-2.081-2.082-1.415 1.415 2.084 2.079A18.892 18.892 0 0 1 33 53.949V51h-2v2.949A18.892 18.892 0 0 1 19.312 49.1l2.082-2.081-1.415-1.415-2.079 2.084A18.892 18.892 0 0 1 13.051 36H16v-2h-2.949A18.892 18.892 0 0 1 17.9 22.312l2.081 2.082 1.415-1.415-2.084-2.079A18.892 18.892 0 0 1 31 16.051V19h2v-2.949A18.892 18.892 0 0 1 44.688 20.9l-2.082 2.081 1.415 1.415 2.079-2.084A18.892 18.892 0 0 1 50.949 34H48v2z"
            fill="#000000"
            opacity="1"
            data-original="#000000"
          ></path>
          <path
            d="M35.953 34.539A3.963 3.963 0 0 0 35 32.382V24a3 3 0 0 0-6 0v8.382a3.962 3.962 0 0 0 2.539 6.571l5.254 5.254a3.121 3.121 0 1 0 4.414-4.414zM32 23a1 1 0 0 1 1 1v7.142a3.592 3.592 0 0 0-2 0V24a1 1 0 0 1 1-1zm-2 12a2 2 0 1 1 2 2 2 2 0 0 1-2-2zm9.793 7.793a1.123 1.123 0 0 1-1.586 0l-4.3-4.3a4.006 4.006 0 0 0 1.586-1.586l4.3 4.3a1.12 1.12 0 0 1 0 1.586z"
            fill="#000000"
            opacity="1"
            data-original="#000000"
          ></path>
          <path
            d="M63.707 6.707a1 1 0 0 0 0-1.414l-2-2a1 1 0 0 0-1.414 0l-1.421 1.421a10.965 10.965 0 0 0-13.65 1.508 1 1 0 0 0 0 1.414L49.586 12l-1.4 1.4A26.859 26.859 0 0 0 35 8.171V6h2a3 3 0 0 0 0-6H27a3 3 0 0 0 0 6h2v2.171A26.859 26.859 0 0 0 15.816 13.4l-1.4-1.4 4.364-4.364a1 1 0 0 0 0-1.414A10.965 10.965 0 0 0 5.128 4.714L3.707 3.293a1 1 0 0 0-1.414 0l-2 2a1 1 0 0 0 0 1.414l1.421 1.421a10.965 10.965 0 0 0 1.508 13.65 1 1 0 0 0 1.414 0L9 17.414l1.4 1.4a26.94 26.94 0 0 0 1.485 34.173l-4.78 9.566A1 1 0 0 0 8 64h4a1 1 0 0 0 .651-.241l6.113-5.24a26.9 26.9 0 0 0 26.472 0l6.113 5.24A1 1 0 0 0 52 64h4a1 1 0 0 0 .9-1.447l-4.782-9.564A26.94 26.94 0 0 0 53.6 18.816l1.4-1.4 4.364 4.364a1 1 0 0 0 1.414 0 10.965 10.965 0 0 0 1.508-13.65zM61 5.414l.586.586-.532.532q-.284-.3-.586-.586zM26 3a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H27a1 1 0 0 1-1-1zm5 3h2v2.025C32.668 8.013 32.335 8 32 8s-.668.013-1 .025zM2.414 6 3 5.414l.532.532q-.3.284-.586.586zm1.553 13.618a9 9 0 0 1 12.651-12.65zM10.414 16 13 13.414l1.259 1.259a27.207 27.207 0 0 0-2.586 2.586zm1.216 46H9.618l3.746-7.491a27.183 27.183 0 0 0 3.609 2.911zm40.74 0-5.343-4.58a27.183 27.183 0 0 0 3.609-2.911L54.382 62zM32 60a25 25 0 1 1 25-25 25.028 25.028 0 0 1-25 25zm20.327-42.741a27.207 27.207 0 0 0-2.586-2.586L51 13.414 53.586 16zm7.706 2.359L47.382 6.968a9 9 0 0 1 12.651 12.65z"
            fill="#000000"
            opacity="1"
            data-original="#000000"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export const DownLoadSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="blue"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-download"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
};

export const TableListSVG = () => {
  return (
    <svg
      width={17}
      height={17}
      viewBox="0 0 64 64"
      fill={"black"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="12"
        y="8"
        width="40"
        height="48"
        rx="4"
        ry="4"
        fill="#fff"
        stroke="#000"
        strokeWidth="2"
      />
      <rect
        x="24"
        y="4"
        width="16"
        height="8"
        rx="2"
        ry="2"
        fill="#f2c744"
        stroke="#000"
        strokeWidth="2"
      />
      <circle cx="18" cy="22" r="3" fill="#ff5f5f" />
      <rect x="26" y="20" width="20" height="2" rx="1" fill="#000" />
      <circle cx="18" cy="32" r="3" fill="#ff995f" />
      <rect x="26" y="30" width="20" height="2" rx="1" fill="#000" />
      <circle cx="18" cy="42" r="3" fill="#ffcf5f" />
      <rect x="26" y="40" width="20" height="2" rx="1" fill="#000" />
    </svg>
  );
};

export const ChatSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      x="0"
      y="0"
      viewBox="0 0 24 24"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
      className=""
    >
      <g>
        <g fill="#fff">
          <path
            fillRule="evenodd"
            d="M17.345 1.32c-.864-.07-1.94-.07-3.311-.07H9.966c-1.371 0-2.447 0-3.311.07-.88.073-1.607.221-2.265.557A5.75 5.75 0 0 0 1.877 4.39c-.336.658-.484 1.385-.556 2.265-.071.864-.071 1.94-.071 3.311v4.262a4.522 4.522 0 0 0 4.522 4.522h.601c.249 0 .419.251.327.482-.687 1.716 1.29 3.268 2.794 2.194l2.611-1.865.05-.035a4.25 4.25 0 0 1 2.42-.776h.756c1.549 0 2.493 0 3.287-.232a5.75 5.75 0 0 0 3.9-3.9c.232-.794.232-1.738.232-3.287V9.966c0-1.371 0-2.447-.07-3.311-.073-.88-.221-1.607-.557-2.265a5.75 5.75 0 0 0-2.513-2.513c-.658-.336-1.385-.484-2.265-.556zM5.071 3.214c.411-.21.919-.333 1.706-.397.796-.065 1.81-.066 3.223-.066h4c1.413 0 2.427 0 3.223.066.787.064 1.295.188 1.707.397a4.25 4.25 0 0 1 1.857 1.858c.21.411.333.919.397 1.706.065.796.066 1.81.066 3.223v1.184c0 1.742-.008 2.452-.172 3.012a4.25 4.25 0 0 1-2.882 2.882c-.56.164-1.27.172-3.012.172h-.619a5.75 5.75 0 0 0-3.275 1.05l-2.667 1.905c-.286.204-.661-.09-.53-.416a1.851 1.851 0 0 0-1.72-2.539h-.601a3.022 3.022 0 0 1-3.022-3.022V10c0-1.413 0-2.427.066-3.223.064-.787.188-1.295.397-1.706a4.25 4.25 0 0 1 1.858-1.858z"
            clipRule="evenodd"
            fill="#fff"
            opacity="1"
            data-original="#fff"
            className=""
          ></path>
          <path
            d="M9 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM13 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM17 10a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
            fill="#fff"
            opacity="1"
            data-original="#fff"
            className=""
          ></path>
        </g>
      </g>
    </svg>
  );
};

export const DownSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="20"
      height="17"
      x="0"
      y="0"
      viewBox="0 0 6.35 6.35"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M2.912.532 2.91 5.177l-.87-.868a.265.265 0 0 0-.189-.08.265.265 0 0 0-.183.453L2.99 6.006a.265.265 0 0 0 .375 0l1.322-1.324c.259-.25-.127-.633-.375-.373l-.873.873.002-4.65a.265.265 0 1 0-.529 0z"
          fill="#fff"
          opacity="1"
          data-original="#fff"
        ></path>
      </g>
    </svg>
  );
};

export const SendSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="20"
      height="20"
      x="0"
      y="0"
      viewBox="0 0 24 24"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
    >
      <g>
        <path
          fill="#0000FF" // Blue fill color for the icon
          d="M1 3.22a2.22 2.22 0 0 1 3.19-1.996l17.348 8.44a2.599 2.599 0 0 1 0 4.673L4.19 22.777A2.22 2.22 0 0 1 1 20.78c0-.193-.013-.388.044-.575l2-6.5a1 1 0 0 1 .713-.676L7.877 12l-4.12-1.03a1 1 0 0 1-.713-.676l-2-6.5C.987 3.607 1 3.412 1 3.22zM3.22 3a.22.22 0 0 0-.22.22v.13l1.79 5.817 7.453 1.863a1 1 0 0 1 0 1.94L4.79 14.833 3 20.65v.13a.22.22 0 0 0 .315.198l17.348-8.44a.599.599 0 0 0 0-1.076L3.315 3.022A.22.22 0 0 0 3.219 3z"
          fillRule="evenodd"
          clipRule="evenodd"
          opacity="1"
          data-original="#000000"
        />
      </g>
    </svg>
  );
};

export const MinimizeSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="20"
      height="20"
      x="0"
      y="0"
      viewBox="0 0 28 28"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
    >
      <g>
        <switch>
          <g>
            <path
              d="M4 25c-.9 0-1.3-1.1-.7-1.7L9.6 17H6c-.6 0-1-.4-1-1s.4-1 1-1h6c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1s-1-.4-1-1v-3.6l-6.3 6.3c-.2.2-.4.3-.7.3zm18-12h-6c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1s1 .4 1 1v3.6l6.3-6.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4L18.4 11H22c.6 0 1 .4 1 1s-.4 1-1 1z"
              fill="#fff"
              opacity="1"
              data-original="#000000"
            ></path>
          </g>
        </switch>
      </g>
    </svg>
  );
};

export const OnlineUserIconSVG = () => {
  return (
    <svg width="9px" viewBox="0 0 12 12" fill="#000000">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <circle cx="6" cy="6" r="6" fill="#15c638"></circle>{" "}
      </g>
    </svg>
  );
};
export const UserNotFoundSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width="50"
      height="50"
      viewBox="0 0 100.000000 100.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <metadata>
        Created by potrace 1.16, written by Peter Selinger 2001-2019
      </metadata>
      <g
        transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path d="M321 986 c-51 -17 -89 -49 -107 -93 -17 -40 -16 -263 1 -295 51 -93 66 -131 63 -160 -3 -31 -9 -36 -105 -83 -56 -28 -112 -60 -124 -70 -27 -25 -49 -75 -49 -115 l0 -30 265 0 c263 0 265 0 253 20 -12 19 -24 20 -240 20 -133 0 -228 4 -228 9 0 28 63 78 146 117 50 23 101 52 113 65 30 33 29 109 -4 173 -14 27 -25 55 -25 62 0 6 -7 14 -15 18 -17 6 -21 42 -5 48 6 2 6 18 0 43 -31 132 4 207 107 230 33 7 103 -10 103 -25 0 -4 14 -10 30 -14 23 -4 35 -15 45 -41 19 -43 19 -66 1 -133 -7 -29 -9 -55 -5 -58 15 -9 10 -54 -5 -54 -8 0 -17 -15 -20 -34 -4 -19 -16 -46 -27 -61 -17 -21 -21 -36 -17 -80 3 -30 10 -61 18 -70 11 -14 14 -14 26 2 8 11 11 32 8 54 -4 25 0 47 15 75 12 21 21 43 21 47 0 5 9 20 20 34 20 25 21 37 23 230 1 77 -16 104 -93 145 -63 35 -129 43 -189 24z" />
        <path d="M613 454 c-62 -37 -93 -95 -93 -174 0 -123 77 -200 201 -200 45 0 73 6 95 19 l31 19 59 -59 c55 -55 59 -58 76 -42 18 16 16 19 -41 77 l-59 61 19 30 c13 21 19 49 19 94 0 81 -31 139 -94 176 -61 35 -153 35 -213 -1z m172 -36 l26 -12 -108 -108 c-104 -104 -108 -107 -120 -85 -19 34 -16 107 7 145 39 63 128 91 195 60z m85 -138 c0 -109 -115 -184 -215 -138 l-26 12 108 108 c104 104 108 107 120 85 7 -12 12 -42 13 -67z" />
      </g>
    </svg>
  );
};

export const ReadUnreadMessageSVG = () => {
  return (
    <svg
      viewBox="0 0 16 11"
      height="9"
      width="16"
      preserveAspectRatio="xMidYMid meet"
      class=""
      fill="none"
    >
      <title>msg-dblcheck</title>
      <path
        d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};

export const SelectIconSVG = () => {
  return (
    <svg width="15px" height="15px" viewBox="0 0 1024 1024">
      <path
        fill="#000000"
        d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
      />
    </svg>
  );
};
export const open_Print = ({ onClick }) => {
  return (
    <svg
      width={17}
      height={17}
      viewBox="0 0 64 64"
      fill={"black"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="12"
        y="8"
        width="40"
        height="48"
        rx="4"
        ry="4"
        fill="#fff"
        stroke="#000"
        strokeWidth="2"
      />
      <rect
        x="24"
        y="4"
        width="16"
        height="8"
        rx="2"
        ry="2"
        fill="#f2c744"
        stroke="#000"
        strokeWidth="2"
      />
      <circle cx="18" cy="22" r="3" fill="#ff5f5f" />
      <rect x="26" y="20" width="20" height="2" rx="1" fill="#000" />
      <circle cx="18" cy="32" r="3" fill="#ff995f" />
      <rect x="26" y="30" width="20" height="2" rx="1" fill="#000" />
      <circle cx="18" cy="42" r="3" fill="#ffcf5f" />
      <rect x="26" y="40" width="20" height="2" rx="1" fill="#000" />
    </svg>
  );
};
export const View_Print = ({ onClick }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="6 9 6 2 18 2 18 9"></polyline>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
      <rect x="6" y="14" width="12" height="8"></rect>
    </svg>
  );
};
