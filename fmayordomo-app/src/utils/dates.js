// Obtener el año actual
const anioActual = new Date().getFullYear();

// Función para determinar si un año es bisiesto
// Un año es bisiesto si es divisible por 4, excepto si es divisible por 100,
// a menos que también sea divisible por 400
const esAnioBisiesto = (anio) => {
  return (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);
};

// Fecha de inicio para el contador de días
export const PRIMERO_DE_ENERO = new Date(anioActual, 0, 1);

// Booleano que indica si el año actual es bisiesto
export const ES_ANIO_BISIESTO = esAnioBisiesto(anioActual);

// Cantidad de días en el año actual (365 o 366)
export const DIAS_EN_EL_ANIO = ES_ANIO_BISIESTO ? 366 : 365;

export const MI_NACIMIENTO = new Date(2000, 2, 5);

// Fecha de inicio de la relación: 6 de diciembre de 2025 a las 18:00 GMT-3 (Buenos Aires)
// GMT-3 = UTC-3, así que en UTC sería 21:00
export const INICIO_RELACION = new Date('2025-12-06T21:00:00.000Z');