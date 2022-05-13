import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";

import { getData } from "../utils/fetchData";
import PropertyItem from "../components/PropertyItem";

const Home = (props) => {
  const [properties, setProperties] = useState(props.properties);
  console.log(properties);
  return (
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
