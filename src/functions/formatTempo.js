export const formatTempo = (valor) => {
  if (valor == null || isNaN(valor)) return "-";

  const horas = Math.floor(valor);
  const minutos = Math.round((valor - horas) * 60);

  const h = String(horas).padStart(2, "0");
  const m = String(minutos).padStart(2, "0");

  return `${h}h ${m}m`;
};
