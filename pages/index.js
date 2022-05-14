import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";

import { getData } from "../utils/fetchData";
import PropertyItem from "../components/PropertyItem";

const Home = (props) => {
  const [properties, setProperties] = useState(props.properties);

  const [isCheck, setIsCheck] = useState(false);
  const router = useRouter();

  const handleCheck = (id) => {
    property.forEach((property) => {
      if (property._id === id) property.checked = !property.checked;
    });
    setProperty([...property]);
  };

  const handleCheckALL = () => {
    properties.forEach((property) => (property.checked = !isCheck));
    setProperties([...properties]);
    setIsCheck(!isCheck);
  };

  const handleDeleteAll = () => {
    let deleteArr = [];
    properties.forEach((property) => {
      if (property.checked) {
        deleteArr.push({
          data: "",
          id: property._id,
          title: "Delete all selected properties?",
          type: "DELETE_PROPERTY",
        });
      }
    });

    dispatch({ type: "ADD_MODAL", payload: deleteArr });
  };

  return (
    <div className="home_page">
      <div
        className="delete_all btn btn-danger mt-2"
        style={{ marginBottom: "-10px" }}
      >
        <input
          type="checkbox"
          checked={isCheck}
          onChange={handleCheckALL}
          style={{
            width: "25px",
            height: "25px",
            transform: "translateY(8px)",
          }}
        />

        <button
          className="btn btn-danger ml-2"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={handleDeleteAll}
        >
          DELETE ALL
        </button>
      </div>
      <div className="properties">
        <Head>
          <title>Home</title>
        </Head>

        {properties.length === 0 ? (
          <h2>No hay propiedades para mostrar</h2>
        ) : (
          properties.map((property) => (
            <PropertyItem key={property._id} property={property} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const res = await getData("property");

  return {
    props: {
      properties: res.properties,
      result: res.result,
    }, // will be passed to the page component as props
  };
}
