/* eslint-disable import/no-anonymous-default-export */

import connectDB from "../../../utils/connectDB";
import Property from "../../../models/property";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProperty(req, res);
      break;
    case "PUT":
      await updateProperty(req, res);
      break;
    case "DELETE":
      await deleteProperty(req, res);
      break;
  }
};

const getProperty = async (req, res) => {
  try {
    const { id } = req.query;

    const property = await Property.findById(id);
    if (!property)
      return res
        .status(400)
        .json({ err: "La propiedad no se encuentra en la base de datos!" });

    res.json({ property });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.query;

    const {
      property_Id,
      number,
      address,
      area,
      constructionArea,
      propertyTypeId,
      ownerId,
      images,
    } = req.body;

    if (!property_Id)
      return dispatch({
        type: "NOTIFY",
        payload: {
          error:
            "El número de identificación de la porpiedad  es un campo requerido.",
        },
      });
    if (!number)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "El número de propiedad  es un campo requerido." },
      });
    if (!address)
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: "La dirección de la propiedad es un campo requerido.",
        },
      });
    if (!area)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "El area de la propiedad es un campo requerido." },
      });
    if (!propertyTypeId)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Property Type es un campo requerido." },
      });
    if (!ownerId)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Owner es un campo requerido." },
      });

    if (images.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "La IMAGEN del producto es un campo requerido." },
      });

    await Property.findOneAndUpdate(
      { _id: id },
      {
        property_Id,
        number,
        address,
        area,
        constructionArea,
        propertyTypeId,
        ownerId,
        images,
      }
    );

    res.json({ msg: "¡Los datos de la propiedad ha sido actualizado" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.query;

    await Property.findByIdAndDelete(id);
    res.json({
      msg: "Los datos de la propiedad han sido eliminados de la base de datos!",
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
