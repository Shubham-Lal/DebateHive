import "./right-sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useNavStore } from "../../store/useNavStore";
import { AuthStatus, AuthTab, useAuthStore } from "../../store/useAuthStore";
import ToggleTheme from "../button/toggle-theme";
import Profile from "./profile";
import Explore from "./explore";
import { IoSearch } from "react-icons/io5";
import { GoPerson } from "react-icons/go";

const RightSidebar = () => {
  const location = useLocation();
  const { expand, setExpand } = useNavStore();
  const { isAuthenticated, setAuthTab } = useAuthStore();

  return (
    <div id='right-sidebar'>
      <div className='right-sidebar__container'>
        <Link to='/' className='logo__container'>
          <img src="/logo.png" />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div className='search-button' style={{ borderColor: `${location.pathname === "/search" ? "var(--body_color)" : ""}` }}>
            <Link to='/search' onClick={() => setExpand(false)}>
              <IoSearch size={15} />
            </Link>
          </div>

          <div className='profile-theme__container'>
            <div className={`theme__wrapper`}>
              <ToggleTheme />
            </div>

            {isAuthenticated === AuthStatus.Authenticated ? (
              <Profile />
            ) : (
              <button className='login-btn' onClick={() => setAuthTab(AuthTab.Login)}>
                <GoPerson size={20} />
                <p>Login</p>
              </button>
            )}
          </div>
        </div>

        <div className='explore__container'>
          <Explore />
        </div>

        {!expand && <div className='nav-border' />}
      </div>
    </div>
  )
}

export default RightSidebar