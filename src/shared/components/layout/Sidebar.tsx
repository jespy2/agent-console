import { NavLink } from "react-router-dom";

const navClassName = ({ isActive }: { isActive: boolean }) => {
  return isActive ? 'nav-link nav-link--active' : 'nav-link';
}

export const Sidebar = () => {
  return (
    <aside className='app-sidebar' aria-label='Primary'>
      <nav className='nav'>
        <NavLink to='/policies' className={navClassName}>
          Policies
        </NavLink>
        <NavLink to='/cases' className={navClassName}>
          Cases
        </NavLink>
        <NavLink to='/settings' className={navClassName}>
          Settings
        </NavLink>
      </nav>
    </aside>
  )
}