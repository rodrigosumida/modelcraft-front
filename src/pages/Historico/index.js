import React, { useEffect, useMemo, useState } from "react";

import api from "../../api/axios";

import { Content } from "../../GlobalStyles";
import { TableContainer } from "./styled";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { MaterialReactTable } from "material-react-table";

const Historico = () => {
  const [tableData, setTableData] = useState([]);

  const getData = async () => {
    try {
      const res = await api.get("/orcamento/list");
      setTableData(res.data);
    } catch (err) {
      toast.error("Ocorreu um erro: " + err.message);
      console.log(err);
    }
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
        <MaterialReactTable columns={tableColumns} data={tableData} />
      </TableContainer>
    </Content>
  );
};

export default Historico;
