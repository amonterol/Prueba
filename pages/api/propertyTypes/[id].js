/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import PropertyType from "../../../models/PropertyTypeModel";
import Properties from "../../../models/PropertyModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await updatePropertyType(req, res);
      break;
    case "DELETE":
      await deletePropertyType(req, res);
      break;
  }
};

const updatePropertyType = async (req, res) => {
  try {
    const { id } = req.query;
    const { propertyTypeId, description } = req.body;
    if (!propertyTypeId || !description) {
      return res.status(400).json({ err: "Please add all the fields." });
    }

    const newPropertyType = await PropertyType.findOneAndUpdate(
      { _id: id },
      { propertyTypeId, description }
    );
    res.json({
      msg: "El property type ha sido actualizado satisfactoriamente.",
      propertyType: {
        ...newPropertyType._doc,
        propertyTypeId,
        description,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deletePropertyType = async (req, res) => {
  try {
    const { id } = req.query;

    const properties = await Properties.findOne({ propertyType: id });
    if (properties)
      return res.status(400).json({
        err: "Please delete all properties with a relationship wih propertyType",
      });

    await PropertyType.findByIdAndDelete(id);

    res.json({ msg: "Success! Deleted a property type" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
