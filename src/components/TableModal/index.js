import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export const TableModal = ({ open, onClose, estimativa }) => {
  const [tempos, setTempos] = useState({
    tempo_laminado: "",
    tempo_fundido: "",
    tempo_fundido_zero: "",
    tempo_isopor: "",
    tempo_mdf: "",
  });

  const handleClose = () => {
    onClose();
  };

  // de número decimal → string "HH:mm"
  const decimalToTime = (valor) => {
    if (valor == null || isNaN(valor)) return "";
    const horas = Math.floor(valor);
    const minutos = Math.round((valor - horas) * 60);
    return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(
      2,
      "0"
    )}`;
  };

  // de string "HH:mm" → número decimal
  const timeToDecimal = (timeStr) => {
    if (!timeStr || !timeStr.includes(":")) return null;
    const [h, m] = timeStr.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return null;
    const minutosValidos = Math.min(Math.max(m, 0), 59);
    return h + minutosValidos / 60;
  };

  const handleSubmit = async () => {
    const valoresConvertidos = {
      laminado: {
        tempo: timeToDecimal(tempos.tempo_laminado),
      },
      fundido: {
        tempo: timeToDecimal(tempos.tempo_fundido),
      },
      fundido_zero: {
        tempo: timeToDecimal(tempos.tempo_fundido_zero),
      },
      isopor: {
        tempo: timeToDecimal(tempos.tempo_isopor),
      },
      mdf: {
        tempo: timeToDecimal(tempos.tempo_mdf),
      },
    };

    console.log(valoresConvertidos);
  };

  const handleTimeChange = (campo, valor) => {
    if (/^\d{0,}(:\d{0,2})?$/.test(valor)) {
      setTempos((prev) => ({ ...prev, [campo]: valor }));
    }
  };

  useEffect(() => {
    if (estimativa)
      setTempos({
        tempo_laminado: decimalToTime(estimativa?.laminado?.tempo),
        tempo_fundido: decimalToTime(estimativa?.fundido?.tempo),
        tempo_fundido_zero: decimalToTime(estimativa?.fundido_zero?.tempo),
        tempo_isopor: decimalToTime(estimativa?.isopor?.tempo),
        tempo_mdf: decimalToTime(estimativa?.mdf?.tempo),
      });
  }, [estimativa]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Adicionar valores reais</DialogTitle>
      <DialogContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "500px",
            minWidth: "300px",
            padding: "20px",
          }}
        >
          <TextField
            label="Tempo Laminado (HH:mm)"
            value={tempos.tempo_laminado}
            onChange={(e) => handleTimeChange("tempo_laminado", e.target.value)}
            placeholder="HH:mm"
          />

          <TextField
            label="Tempo Fundido (HH:mm)"
            value={tempos.tempo_fundido}
            onChange={(e) => handleTimeChange("tempo_fundido", e.target.value)}
            placeholder="HH:mm"
          />

          <TextField
            label="Tempo Fundido Zero (HH:mm)"
            value={tempos.tempo_fundido_zero}
            onChange={(e) =>
              handleTimeChange("tempo_fundido_zero", e.target.value)
            }
            placeholder="HH:mm"
          />

          <TextField
            label="Tempo Isopor (HH:mm)"
            value={tempos.tempo_isopor}
            onChange={(e) => handleTimeChange("tempo_isopor", e.target.value)}
            placeholder="HH:mm"
          />

          <TextField
            label="Tempo MDF (HH:mm)"
            value={tempos.tempo_mdf}
            onChange={(e) => handleTimeChange("tempo_mdf", e.target.value)}
            placeholder="HH:mm"
          />
        </div>
      </DialogContent>

      <DialogActions sx={{ p: "1.25rem" }}>
        <Button sx={{ color: "#c72020" }} onClick={handleClose}>
          Voltar
        </Button>
        <Button
          sx={{ backgroundColor: "#c72020", color: "white" }}
          onClick={handleSubmit}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
