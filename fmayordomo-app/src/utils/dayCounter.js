function calcularDiferenciaEntreFechas(fechaInicial, fechaFinal) {
  // Si no se proporciona fechaFinal, usar la fecha actual
  if (!fechaFinal) {
    fechaFinal = new Date();
  }
  
  // Crear copias de las fechas para no modificar las originales
  const date1 = new Date(fechaInicial);
  const date2 = new Date(fechaFinal);

  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);

  const diferenciaMilisegundos = Math.abs(date2.getTime() - date1.getTime());

  const milisegundosPorDia = 1000 * 60 * 60 * 24;
  
  return diferenciaMilisegundos / milisegundosPorDia + 1;
}

export default calcularDiferenciaEntreFechas;

