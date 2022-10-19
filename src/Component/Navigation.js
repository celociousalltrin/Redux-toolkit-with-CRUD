import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import AuthorDetails from "../Pages/Author.js/AuthorDetails";

const Navigation = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<AuthorDetails />} />
      </Routes>
    </>
  );
};

export default Navigation;
