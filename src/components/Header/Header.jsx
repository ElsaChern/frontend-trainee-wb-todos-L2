import logo from "../../assets/img/To-Do-Logo 1.svg";
import style from "./Header.module.css";

const Header = () => {
  return (
    <div className={style.header}>
      <img src={logo} alt="logo"></img>
    </div>
  );
};

export default Header;
