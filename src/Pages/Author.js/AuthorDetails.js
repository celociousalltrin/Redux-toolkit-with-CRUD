import React from "react";
import { GetData } from "../../Feature/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthorData from "./AuthorData";

const AuthorDetails = () => {
  const dispatch = useDispatch();

  const getParams = useParams();
  const getValue = getParams.id;

  const AuthorList = useSelector((state) => state.UserInfo.value);

  useEffect(() => {
    dispatch(GetData());
  }, [dispatch]);

  const AuthorDetails = AuthorList.filter(({ userId }) => {
    return userId == getValue;
  });

  return (
    <div>
      <AuthorData AuthorDetails={AuthorDetails} getValue={getValue} />
    </div>
  );
};

export default AuthorDetails;
