import React from "react";
import Navbar from './Navbar'
import '../../index.css'
// import Footer from "./Footer";

const Layout = ({
  title = "Title",
  description,
  className,
  children,
}) => {
  return (
    <>
    <Navbar />
      <div className="jumbotron">
        <h2> {title} </h2>
        <p className="lead"> {description} </p>
      </div>
      <div className={className + ' mb-2'}> {children} </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
