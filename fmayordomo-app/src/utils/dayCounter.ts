function calcularDiferenciaEntreFechas(): number {
  
  const date1 = new Date(2026, 0, 1);
  const date2 = new Date();

  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);

  const diferenciaMilisegundos = Math.abs(date2.getTime() - date1.getTime());

  const milisegundosPorDia = 1000 * 60 * 60 * 24;
  
  return diferenciaMilisegundos / milisegundosPorDia + 1;
}

export default calcularDiferenciaEntreFechas;
