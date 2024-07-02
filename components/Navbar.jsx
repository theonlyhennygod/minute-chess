// components/Navbar.js
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => (
  <nav className="bg-black p-4 flex justify-between items-center">
    <Image src="/logo.png" alt="Logo" width={50} height={50} priority />
    <div className="flex space-x-4">
      <a
        href="https://github.com/theonlyhennygod/sorting-algorithm-visualizer"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/argenisdelarosa"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white"
      >
        <FaLinkedin />
      </a>
    </div>
  </nav>
);

export default Navbar;
