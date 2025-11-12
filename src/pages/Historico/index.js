import React, { useEffect, useMemo, useState } from "react";

import api from "../../api/axios";

import { toast } from "react-toastify";
import { MaterialReactTable } from "material-react-table";

import Header from "../../components/Header";
import { Content } from "../../GlobalStyles";
import { TableContainer } from "./styled";
import CircleIcon from "@mui/icons-material/Circle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { IconButton, Tooltip } from "@mui/material";
import { TableModal } from "../../components/TableModal";
import { formatTempo } from "../../functions/formatTempo";

const Historico = () => {
  const [tableData, setTableData] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [estimativa, setEstimativa] = useState({});

  const getData = async () => {
    try {
      const res = await api.get("/orcamento/list");
      setTableData(res.data);
    } catch (err) {
      toast.error("Ocorreu um erro: " + err.message);
      console.log(err);
    }
  };

  const handleOpenModal = (estimativa) => {
    setModalOpen(true);
    setEstimativa(estimativa);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEstimativa({});
    getData();
  };

  const tableColumns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        enableHiding: false,
        size: 80,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 20,
        Cell: ({ cell, row }) => {
          const status = cell.getValue();

          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {status !== "estimativa" ? (
                <CircleIcon sx={{ fill: "#AEC455", color: "#AEC455" }} />
              ) : (
                <Tooltip
                  arrow
                  placement="bottom"
                  title="Adicionar valores reais"
                >
                  <IconButton onClick={() => handleOpenModal(row.original)}>
                    <AccessTimeIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "cliente",
        header: "Cliente",
        size: 20,
      },
      {
        accessorKey: "produto",
        header: "Produto",
        size: 20,
      },
      {
        header: "Tamanho",
        accessorFn: (row) => {
          const { comprimento, largura, altura } = row;
          if (!comprimento || !largura || !altura) return "-";
          return `${comprimento} x ${largura} x ${altura}`;
        },
        size: 30,
      },
      {
        accessorKey: "area",
        header: "Área",
        size: 20,
      },
      {
        accessorKey: "perimetro",
        header: "Perímetro",
        size: 20,
      },
      {
        accessorKey: "chapa_fundo",
        header: "Chapa Fundo",
        size: 20,
      },
    ],
    []
  );

  useEffect(() => {
    getData();
  }, []);

  return (
    <Content>
      <Header />
      <TableContainer>
        <MaterialReactTable
          columns={tableColumns}
          data={tableData}
          enableExpanding
          enableExpandAll
          muiTableProps={{
            sx: {
              border: "none",
            },
          }}
          muiTablePaperProps={{
            sx: {
              boxShadow: "none",
              border: "1px solid #BFBFBF",
              borderRadius: "5px",
              height: "100%",
            },
          }}
          initialState={{
            columnVisibility: { _id: false },
            pagination: { pageSize: 10, pageIndex: 0 },
            expanded: true,
          }}
          renderDetailPanel={({ row }) => {
            const { laminado, fundido, fundido_zero, isopor, mdf } =
              row.original;

            return (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "10px",
                  padding: "10px",
                  background: "#f8f8f8",
                  borderRadius: "6px",
                }}
              >
                {laminado && (
                  <div
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                      background: "white",
                    }}
                  >
                    <strong>Alumínio Laminado</strong>
                    <p>Volume: {laminado.volume.toFixed(2) ?? "-"}</p>
                    <p>Massa: {laminado.massa.toFixed(2) ?? "-"}</p>
                    <p>
                      Tempo:{" "}
                      {`${laminado.tempo.toFixed(2)} (${formatTempo(
                        laminado.tempo.toFixed(2)
                      )})` ?? "-"}
                    </p>
                  </div>
                )}

                {fundido && (
                  <div
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                      background: "white",
                    }}
                  >
                    <strong>Alumínio Fundido</strong>
                    <p>Volume: {fundido.volume.toFixed(2) ?? "-"}</p>
                    <p>Massa: {fundido.massa.toFixed(2) ?? "-"}</p>
                    <p>
                      Tempo:{" "}
                      {`${fundido.tempo.toFixed(2)} (${formatTempo(
                        fundido.tempo.toFixed(2)
                      )})` ?? "-"}
                    </p>
                  </div>
                )}

                {fundido_zero && (
                  <div
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                      background: "white",
                    }}
                  >
                    <strong>Alumínio Fundido a Zero</strong>
                    <p>Volume: {fundido_zero.volume.toFixed(2) ?? "-"}</p>
                    <p>Massa: {fundido_zero.massa.toFixed(2) ?? "-"}</p>
                    <p>
                      Tempo:{" "}
                      {`${fundido_zero.tempo.toFixed(2)} (${formatTempo(
                        fundido_zero.tempo.toFixed(2)
                      )})` ?? "-"}
                    </p>
                  </div>
                )}

                {isopor && (
                  <div
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                      background: "white",
                    }}
                  >
                    <strong>Isopor</strong>
                    <p>
                      Tamanho:{" "}
                      {`${isopor.comprimento}x${isopor.largura}x${isopor.altura}` ??
                        "-"}
                    </p>
                    <p>Volume: {isopor.volume.toFixed(2) ?? "-"}</p>
                    <p>
                      Tempo:{" "}
                      {`${isopor.tempo.toFixed(2)} (${formatTempo(
                        isopor.tempo.toFixed(2)
                      )})` ?? "-"}
                    </p>
                  </div>
                )}

                {mdf && (
                  <div
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "10px",
                      background: "white",
                    }}
                  >
                    <strong>MDF</strong>
                    <p>
                      Tamanho:{" "}
                      {`${mdf.comprimento}x${mdf.largura}x${mdf.altura}` ?? "-"}
                    </p>
                    <p>Chapas: {mdf.chapas.toFixed(2) ?? "-"}</p>
                    <p>
                      Tempo:{" "}
                      {`${mdf.tempo.toFixed(2)} (${formatTempo(
                        mdf.tempo.toFixed(2)
                      )})` ?? "-"}
                    </p>
                  </div>
                )}
              </div>
            );
          }}
        />
      </TableContainer>
      <TableModal
        open={modalOpen}
        onClose={handleCloseModal}
        estimativa={estimativa}
      />
    </Content>
  );
};

export default Historico;
