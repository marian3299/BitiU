import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="p-3 bg-gray-500">
        <nav className="flex justify-between text-white">
          <Link to="/">HOME</Link>
          <Link to="/blog">BLOG</Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
