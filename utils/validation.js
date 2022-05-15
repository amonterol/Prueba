const validation = (
  property_Id,
  number,
  address,
  area,
  constructionArea,
  propertyTypeId,
  ownerId
) => {
  if (!property_Id && !number && !address && !area)
    return "Por favor complete toda la información requerida.";

  if (!property_Id)
    return "El número de identificación de la porpiedad  es un campo requerido.";

  if (!validateProperty_Id(property_Id))
    return "La property_Id que sea un número entero.";

  if (!validateProperty_IdMayorQueCero(property_Id)) {
    return "Ingrese un property_Id que sea un número entero.";
  }

  if (!number) return "El número de propiedad  es un campo requerido.";

  if (!validateNumber(number))
    return "El campo number requiere se ingrese solo caracteres alfanuméricos.";

  if (!address) return "La dirección de la propiedad es un campo requerido.";

  if (!validateAddress(address)) {
    return "El campo address requiere se ingrese solo caracteres alfanuméricos.";
  }

  if (!area) return "El area de la propiedad es un campo requerido.";

  if (!propertyTypeId) return "Property Type es un campo requerido.";

  if (!ownerId) return "Owner es un campo requerido.";

  if (!propertyTypeId) {
    return "Por favor seleccione el propertyTypeId.";
  }

  if (!ownerId) {
    return "Por favor seleccione el ownerId.";
  }
};

function validateProperty_Id(property_Id) {
  const re = /^[0-9]*$/;
  return re.test(property_Id);
}

function validateProperty_IdMayorQueCero(property_Id) {
  const parsed = parseInt(property_Id, 10);
  if (parsed === 0) {
    return false;
  } else {
    return true;
  }
}

function validateNumber(number) {
  const re = /^([A-Za-z0-9\s]+)$/;
  return re.test(number);
}

function validateAddress(address) {
  const re = /^([A-Za-z0-9\s]+)$/;
  return re.test(address);
}

/*
function validateArea(area) {
  const re = /^([1-9]([0-9]+(.[0-9]{1,2})))?$/;
  return re.test(area);
}

function validateConstructionArea(constructionArea) {
  const re = /^([1-9]([0-9]+(.[0-9]{1,2})))?$/;
  return re.test(constructionArea);
}


function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
*/
export default validation;
