import React from "react";
import image from "../../assets/images/logo-SJ.png";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <React.Fragment>
      {/*<!-- Sidebar -->*/}
      <ul
        className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/*<!-- Sidebar - Brand -->*/}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <div className="sidebar-brand-icon">
            <img className="w-100" src={image} alt="Simplemente Juguetes" />
          </div>
        </a>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {/*<!-- Nav Item - Dashboard -->*/}
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard - SJ</span>
          </Link>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider" />

        {/*<!-- Heading -->*/}
        <div className="sidebar-heading">Actions</div>

        <li className="nav-item">
          <Link className="nav-link" to="/usuarios">
            <i class="fa-solid fa-user"></i>
            <span>Usuarios</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/productos">
            <i class="fa-solid fa-book"></i>
            <span>Productos</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/categorias">
          <i class="fa-solid fa-list"></i>
            <span>Categorias</span>
          </Link>
        </li>


        <li className="nav-item">
          <Link className="nav-link" to="/ordenes">
            <i class="fa-solid fa-cart-shopping"></i>
            <span>Ordenes</span>
          </Link>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
      {/*<!-- End of Sidebar -->*/}
    </React.Fragment>
  );
}
export default SideBar;
