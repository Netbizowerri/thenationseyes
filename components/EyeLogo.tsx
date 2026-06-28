
import { Link } from 'react-router-dom';

interface EyeLogoProps {
  linkTo?: string;
}

export default function EyeLogo({ linkTo = '/' }: EyeLogoProps) {
  return (
    <Link to={linkTo} className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center select-none cursor-pointer block group transition-transform duration-300 hover:scale-110">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
        <path
          d="M10,50 Q25,20 50,20 T90,50 Q75,80 50,80 T10,50"
          fill="white"
          stroke="black"
          strokeWidth="4"
          className="group-hover:stroke-red-600 transition-colors duration-300"
        />
        <circle cx="50" cy="50" r="18" fill="black" />
        <g transform="translate(42, 42) scale(0.16)">
          <path
            d="M10,40 C10,35 15,30 20,25 C25,20 30,22 40,20 C50,18 60,15 70,20 C80,25 85,35 90,45 C95,55 85,75 75,85 C65,95 50,90 40,88 C30,86 15,80 10,65 Z"
            fill="white"
          />
          <circle cx="55" cy="45" r="8" fill="#15803d" />
        </g>
      </svg>
    </Link>
  );
}
