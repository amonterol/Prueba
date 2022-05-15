const validationPropertyType = (propertyTypeId, description) => {
  if (!propertyTypeId && !description)
    return "Por favor complete toda la información requerida.";

  if (!propertyTypeId)
    return "El número de identificación de la propietario  es un campo requerido.";

  if (!validatePropertyTypeId(propertyTypeId))
    return "La propertyTypeId debe ser un número entero.";

  if (!validatePropertyTypeIdMayorQueCero(propertyTypeId)) {
    return "Ingrese un propertyTypeId que sea un número entero.";
  }

  if (!description) return "La descripción es un campo requerido.";

  if (!validateDescription(description))
    return "El campo description requiere se ingrese solo letras -- NO USE TILDES.";
};

function validatePropertyTypeId(propertyTypeId) {
  const re = /^[0-9]*$/;
  return re.test(propertyTypeId);
}

function validatePropertyTypeIdMayorQueCero(propertyTypeId) {
  const parsed = parseInt(propertyTypeId, 10);
  if (parsed === 0) {
    return false;
  } else {
    return true;
  }
}

function validateDescription(description) {
  const re = /^([A-Za-z\s]+)$/;
  return re.test(description);
}

export default validationPropertyType;
