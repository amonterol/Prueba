/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import React, { useContext } from "react";
import { DataContext } from "../store/GlobalState";

const PropertyItem = ({ property, handleCheck }) => {
  const { state, dispatch } = useContext(DataContext);

  return (
    <div className="col mt-2 mb-2">
      <div className="card m-0 p-0" style={{ width: "20rem" }}>
        {
          <input
            type="checkbox"
            checked={property.checked}
            className="position-absolute"
            style={{ height: "20px", width: "20px" }}
            onChange={() => handleCheck(property._id)}
          />
        }
        <img
          className=" card-img-top"
          src={property.images[0].url}
          alt={property.images[0].url}
          width="300%"
          height="300%"
        />

        {/*  ---------------------------------- women and men clothes secction ------------------------------------ */}

        {/*  ---------------------------------- women and men clothes secction ------------------------------------ */}
      </div>
    </div>
  );
};

export default PropertyItem;
