/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Properties from "../../../models/PropertyModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProperties(req, res);
      break;
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Properties.find();

    res.json({
      status: "success",
      result: properties.length,
      properties,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
