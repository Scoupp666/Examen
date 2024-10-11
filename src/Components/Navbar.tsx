import { Link } from "react-router-dom";
import "./Navbar.css"
// type Props = {}

const Navbar = () => {
  return <>
    <div className="navbar">
      <Link to={"/Amiibos"}>Amiibos</Link>
      <Link to={"/Series"}>Series</Link>
      <Link to={"/About"}>About</Link>
    </div>
  </>
}

export default Navbar