import React, { useState } from "react";

// import api from "../../api/axios";
import { Content } from "../../GlobalStyles";
import {
  LeftInputSection,
  InputsSection,
  LogoContainer,
  MiddleContainer,
  TopContainer,
  InputsContainer,
  UploadButtonContainer,
  SizesContainer,
  InputSizesContainer,
  InputSizerContainer,
  SubmitButtonContainer,
  ExtraInfoSection,
  ExtraInfoContainer,
  MaterialInfoContainer,
  LowerContainer,
  ProductInfoContainer,
} from "./styled";
import Header from "../../components/Header";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { formatTempo } from "../../functions/formatTempo";

const Index = () => {
  const [estimativa, setEstimativa] = useState({
    cliente: "",
    produto: "",
    comprimento: null,
    largura: null,
    altura: null,
    area: null,
    perimetro: null,
    laminado: {
      volume: null,
      massa: null,
      tempo: null,
    },
    fundido: {
      volume: null,
      massa: null,
      tempo: null,
    },
    fundido_zero: {
      volume: null,
      massa: null,
      tempo: null,
    },
    isopor: {
      comprimento: null,
      largura: null,
      altura: null,
      volume: null,
      tempo: null,
    },
    mdf: {
      comprimento: null,
      largura: null,
      altura: null,
      chapas: null,
      tempo: null,
    },
    chapa_fundo: null,
  });

  const [botaoGerar, setBotaoGerar] = useState(false);
  const [botaoCriar, setBotaoCriar] = useState(false);

  const gerarEstimativa = async (e) => {
    e.preventDefault();
    setBotaoGerar(true);

    try {
      const {
        cliente,
        produto,
        comprimento,
        largura,
        altura,
        area,
        isopor,
        mdf,
      } = estimativa;

      // checa campos vazios
      const camposObrigatorios = {
        cliente,
        produto,
        comprimento,
        largura,
        altura,
        area,
        isopor_comprimento: isopor.comprimento,
        isopor_largura: isopor.largura,
        isopor_altura: isopor.altura,
        mdf_comprimento: mdf.comprimento,
        mdf_largura: mdf.largura,
        mdf_altura: mdf.altura,
      };

      for (const [campo, valor] of Object.entries(camposObrigatorios)) {
        if (valor === "" || valor === null || valor === undefined) {
          toast.error(`O campo "${campo}" deve ser preenchido.`);
          setBotaoGerar(false);
          return;
        }
      }

      const camposNumericos = {
        comprimento,
        largura,
        altura,
        area,
        isopor_comprimento: isopor.comprimento,
        isopor_largura: isopor.largura,
        isopor_altura: isopor.altura,
        mdf_comprimento: mdf.comprimento,
        mdf_largura: mdf.largura,
        mdf_altura: mdf.altura,
      };
      const valoresConvertidos = {
        isopor: {},
        mdf: {},
      };

      for (const [campo, valor] of Object.entries(camposNumericos)) {
        const numero = Number(valor);
        if (isNaN(numero)) {
          toast.error(`O campo "${campo}" deve conter um número válido.`);
          setBotaoGerar(false);
          return;
        }

        if (campo.includes("isopor")) {
          const nomeCampo = campo.split("_")[1];

          valoresConvertidos["isopor"] = {
            ...valoresConvertidos["isopor"],
            [`${nomeCampo}`]: numero,
          };
        } else if (campo.includes("mdf")) {
          const nomeCampo = campo.split("_")[1];

          valoresConvertidos["mdf"] = {
            ...valoresConvertidos["mdf"],
            [`${nomeCampo}`]: numero,
          };
        } else {
          valoresConvertidos[campo] = numero;
        }
      }

      const res = await api.post("/orcamento/gerar-estimativa", {
        cliente,
        produto,
        ...valoresConvertidos,
      });

      const { perimetro, chapa_fundo, laminado, fundido, fundido_zero } =
        res.data;

      setEstimativa({
        ...estimativa,
        perimetro,
        chapa_fundo,
        isopor: { ...isopor, ...res.data.isopor },
        mdf: { ...mdf, ...res.data.mdf },
        laminado,
        fundido,
        fundido_zero,
      });

      toast.success("Estimativa gerada com sucesso!");
    } catch (err) {
      toast.error("Ocorreu um erro ao gerar estimativa");
      console.error(err);
    }

    setBotaoGerar(false);
  };

  const validateFields = (obj) => {
    for (const key in obj) {
      const valor = obj[key];

      if (valor === null || valor === undefined || valor === "") {
        return false;
      }

      // se for um objeto
      if (typeof valor === "object" && !Array.isArray(valor)) {
        if (!validateFields(valor)) return false;
      }
    }

    return true;
  };

  const submitOrcamento = async (e) => {
    e.preventDefault();
    setBotaoCriar(true);

    try {
      if (!validateFields(estimativa)) toast.error("Preencha todos os campos");

      await api.post("/orcamento/create", estimativa);
      toast.success("Orçamento salvo com sucesso!");
    } catch (err) {
      toast.error("Ocorreu um erro ao salvar o orçamento");
      console.error(err);
    }

    setBotaoCriar(false);
  };

  return (
    <Content>
      <Header current={"gerador"} />
      <TopContainer>
        <InputsSection>
          <LeftInputSection>
            <LogoContainer>
              <img
                src="https://grvsoftware.com.br/wp-content/themes/yootheme/cache/01383948000136-a8a98bab.png"
                alt="Logo Modelcraft"
              />
              <ProductInfoContainer>
                <input
                  style={{
                    width: "60%",
                    padding: "5px 10px",
                    borderRadius: "3px",
                    border: "none",
                  }}
                  placeholder="Cliente"
                  name="cliente"
                  value={estimativa.cliente}
                  onChange={(e) =>
                    setEstimativa({ ...estimativa, cliente: e.target.value })
                  }
                ></input>
                <input
                  style={{
                    width: "60%",
                    padding: "5px 10px",
                    borderRadius: "3px",
                    border: "none",
                  }}
                  placeholder="Produto"
                  name="produto"
                  value={estimativa.produto}
                  onChange={(e) =>
                    setEstimativa({ ...estimativa, produto: e.target.value })
                  }
                ></input>
              </ProductInfoContainer>
            </LogoContainer>
            <InputsContainer>
              <UploadButtonContainer>
                <button>Upload de Arquivo</button>
              </UploadButtonContainer>
              <SizesContainer>
                <InputSizesContainer>
                  <InputSizerContainer>
                    <input
                      style={{
                        width: "100%",
                        padding: "10px 20px",
                        borderRadius: "3px",
                        border: "none",
                        textAlign: "center",
                      }}
                      type="number"
                      placeholder="Comprimento"
                      name="comprimento"
                      value={estimativa.comprimento}
                      onChange={(e) =>
                        setEstimativa({
                          ...estimativa,
                          comprimento: e.target.value,
                        })
                      }
                    ></input>
                  </InputSizerContainer>
                  <InputSizerContainer>
                    <input
                      style={{
                        width: "100%",
                        padding: "10px 20px",
                        borderRadius: "3px",
                        border: "none",
                        textAlign: "center",
                      }}
                      type="number"
                      placeholder="Largura"
                      name="largura"
                      value={estimativa.largura}
                      onChange={(e) =>
                        setEstimativa({
                          ...estimativa,
                          largura: e.target.value,
                        })
                      }
                    ></input>
                  </InputSizerContainer>
                  <InputSizerContainer>
                    <input
                      style={{
                        width: "100%",
                        padding: "10px 20px",
                        borderRadius: "3px",
                        border: "none",
                        textAlign: "center",
                      }}
                      type="number"
                      placeholder="Altura"
                      name="altura"
                      value={estimativa.altura}
                      onChange={(e) =>
                        setEstimativa({ ...estimativa, altura: e.target.value })
                      }
                    ></input>
                  </InputSizerContainer>
                </InputSizesContainer>
                <SubmitButtonContainer>
                  <button
                    disabled={botaoGerar}
                    style={{ width: "100%" }}
                    onClick={gerarEstimativa}
                  >
                    Gerar
                  </button>
                </SubmitButtonContainer>
              </SizesContainer>
            </InputsContainer>
          </LeftInputSection>
        </InputsSection>
        <ExtraInfoSection>
          <ExtraInfoContainer>
            <span>Área</span>
            <input
              style={{
                width: "100%",
                padding: "10px 20px",
                borderRadius: "3px",
                border: "none",
                textAlign: "center",
              }}
              type="number"
              name="area"
              value={estimativa.area}
              onChange={(e) =>
                setEstimativa({ ...estimativa, area: e.target.value })
              }
            ></input>
          </ExtraInfoContainer>
          <ExtraInfoContainer>
            <span>Perímetro</span>
            <input
              style={{
                width: "100%",
                padding: "10px 20px",
                borderRadius: "3px",
                border: "none",
                textAlign: "center",
              }}
              type="number"
              name="perimetro"
              value={estimativa.perimetro}
              onChange={(e) =>
                setEstimativa({ ...estimativa, perimetro: e.target.value })
              }
            ></input>
          </ExtraInfoContainer>
          <ExtraInfoContainer className="single">
            <span>Chapa Fundo</span>
            <input
              style={{
                width: "100%",
                padding: "10px 20px",
                borderRadius: "3px",
                border: "none",
                textAlign: "center",
              }}
              type="number"
              name="chapa-fundo"
              value={estimativa.chapa_fundo}
              onChange={(e) =>
                setEstimativa({ ...estimativa, chapa_fundo: e.target.value })
              }
            ></input>
          </ExtraInfoContainer>
        </ExtraInfoSection>
      </TopContainer>

      <MiddleContainer>
        <MaterialInfoContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
              Alumínio Laminado
            </span>
          </div>
          <span>Volume:</span>
          <input
            style={{
              width: "100%",
              padding: "10px 20px",
              borderRadius: "3px",
              border: "none",
              textAlign: "center",
            }}
            type="number"
            name="volume-laminado"
            value={estimativa.laminado.volume}
            onChange={(e) =>
              setEstimativa({
                ...estimativa,
                laminado: { ...estimativa.laminado, volume: e.target.value },
              })
            }
          ></input>
          <span>Massa:</span>
          <input
            style={{
              width: "100%",
              padding: "10px 20px",
              borderRadius: "3px",
              border: "none",
              textAlign: "center",
            }}
            type="number"
            name="massa-laminado"
            value={estimativa.laminado.massa}
            onChange={(e) =>
              setEstimativa({
                ...estimativa,
                laminado: { ...estimativa.laminado, massa: e.target.value },
              })
            }
          ></input>
          <span>Tempo estimado:</span>
          <input
            style={{
              width: "100%",
              padding: "10px 20px",
              borderRadius: "3px",
              border: "none",
              textAlign: "center",
            }}
            type="number"
            name="tempo-laminado"
            value={estimativa.laminado.tempo}
            onChange={(e) =>
              setEstimativa({
                ...estimativa,
                laminado: { ...estimativa.laminado, tempo: e.target.value },
              })
            }
          ></input>
        </MaterialInfoContainer>
        <MaterialInfoContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
              Alumínio Fundido
            </span>
          </div>
          <span>Volume:</span>
          <input
            style={{
              width: "100%",
              padding: "10px 20px",
              borderRadius: "3px",
              border: "none",
              textAlign: "center",
            }}
            type="number"
            name="volume-fundido"
            value={estimativa.fundido.volume}
            onChange={(e) =>
              setEstimativa({
                ...estimativa,
                fundido: { ...estimativa.fundido, volume: e.target.value },
              })
            }
          ></input>
          <span>Massa:</span>
          <input
            style={{
              width: "100%",
              padding: "10px 20px",
              borderRadius: "3px",
              border: "none",
              textAlign: "center",
            }}
            type="number"
            name="massa-fundido"
            value={estimativa.fundido.massa}
            onChange={(e) =>
              setEstimativa({
                ...estimativa,
                fundido: { ...estimativa.fundido, massa: e.target.value },
              })
            }
          ></input>
          <span>Tempo estimado:</span>
          <input
            style={{
              width: "100%",
              padding: "10px 20px",
              borderRadius: "3px",
              border: "none",
              textAlign: "center",
            }}
            type="number"
            name="tempo-fundido"
            value={estimativa.fundido.tempo}
            onChange={(e) =>
              setEstimativa({
                ...estimativa,
                fundido: { ...estimativa.fundido, tempo: e.target.value },
              })
            }
          ></input>
        </MaterialInfoContainer>
        <MaterialInfoContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
              Alumínio Fundido Zero
            </span>
          </div>
          <span>Volume:</span>
          <input
            style={{
              width: "100%",
              padding: "10px 20px",
              borderRadius: "3px",
              border: "none",
              textAlign: "center",
            }}
            type="number"
            name="volume-fundido-zero"
            value={estimativa.fundido_zero.volume}
            onChange={(e) =>
              setEstimativa({
                ...estimativa,
                fundido_zero: {
                  ...estimativa.fundido_zero,
                  volume: e.target.value,
                },
              })
            }
          ></input>
          <span>Massa:</span>
          <input
            style={{
              width: "100%",
              padding: "10px 20px",
              borderRadius: "3px",
              border: "none",
              textAlign: "center",
            }}
            type="number"
            name="massa-fundido-zero"
            value={estimativa.fundido_zero.massa}
            onChange={(e) =>
              setEstimativa({
                ...estimativa,
                fundido_zero: {
                  ...estimativa.fundido_zero,
                  massa: e.target.value,
                },
              })
            }
          ></input>
          <span>Tempo estimado:</span>
          <input
            style={{
              width: "100%",
              padding: "10px 20px",
              borderRadius: "3px",
              border: "none",
              textAlign: "center",
            }}
            type="number"
            name="tempo-fundido-zero"
            value={estimativa.fundido_zero.tempo}
            onChange={(e) =>
              setEstimativa({
                ...estimativa,
                fundido_zero: {
                  ...estimativa.fundido_zero,
                  tempo: e.target.value,
                },
              })
            }
          ></input>
        </MaterialInfoContainer>
        <MaterialInfoContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "1rem" }}>Isopor</span>
          </div>
          <span>CxLxA:</span>
          <div style={{ display: "flex", gap: "5px" }}>
            <input
              style={{
                width: "30%",
                padding: "10px",
                borderRadius: "3px",
                border: "none",
                textAlign: "center",
              }}
              type="number"
              name="comprimento-isopor"
              value={estimativa.isopor.comprimento}
              onChange={(e) =>
                setEstimativa({
                  ...estimativa,
                  isopor: {
                    ...estimativa.isopor,
                    comprimento: e.target.value,
                  },
                })
              }
            ></input>
            <input
              style={{
                width: "30%",
                padding: "10px",
                borderRadius: "3px",
                border: "none",
                textAlign: "center",
              }}
              type="number"
              name="largura-isopor"
              value={estimativa.isopor.largura}
              onChange={(e) =>
                setEstimativa({
                  ...estimativa,
                  isopor: {
                    ...estimativa.isopor,
                    largura: e.target.value,
                  },
                })
              }
            ></input>
            <input
              style={{
                width: "30%",
                padding: "10px",
                borderRadius: "3px",
                border: "none",
                textAlign: "center",
              }}
              type="number"
              name="altura-isopor"
              value={estimativa.isopor.altura}
              onChange={(e) =>
                setEstimativa({
                  ...estimativa,
                  isopor: {
                    ...estimativa.isopor,
                    altura: e.target.value,
                  },
                })
              }
            ></input>
          </div>
          <span>Volume:</span>
          <input
            style={{
              width: "100%",
              padding: "10px 20px",
              borderRadius: "3px",
              border: "none",
              textAlign: "center",
            }}
            type="number"
            name="volume-isopor"
            value={estimativa.isopor.volume}
            onChange={(e) =>
              setEstimativa({
                ...estimativa,
                isopor: {
                  ...estimativa.isopor,
                  volume: e.target.value,
                },
              })
            }
          ></input>
          <span>Tempo estimado:</span>
          <input
            style={{
              width: "100%",
              padding: "10px 20px",
              borderRadius: "3px",
              border: "none",
              textAlign: "center",
            }}
            type="number"
            name="tempo-isopor"
            value={estimativa.isopor.tempo}
            onChange={(e) =>
              setEstimativa({
                ...estimativa,
                isopor: {
                  ...estimativa.isopor,
                  tempo: e.target.value,
                },
              })
            }
          ></input>
        </MaterialInfoContainer>
        <MaterialInfoContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
              {"Chapas (MDF)"}
            </span>
          </div>
          <span>CxLxA:</span>
          <div style={{ display: "flex", gap: "5px" }}>
            <input
              style={{
                width: "30%",
                padding: "10px",
                borderRadius: "3px",
                border: "none",
                textAlign: "center",
              }}
              type="number"
              name="comprimento-mdf"
              value={estimativa.mdf.comprimento}
              onChange={(e) =>
                setEstimativa({
                  ...estimativa,
                  mdf: {
                    ...estimativa.mdf,
                    comprimento: e.target.value,
                  },
                })
              }
            ></input>
            <input
              style={{
                width: "30%",
                padding: "10px",
                borderRadius: "3px",
                border: "none",
                textAlign: "center",
              }}
              type="number"
              name="largura-mdf"
              value={estimativa.mdf.largura}
              onChange={(e) =>
                setEstimativa({
                  ...estimativa,
                  mdf: {
                    ...estimativa.mdf,
                    largura: e.target.value,
                  },
                })
              }
            ></input>
            <input
              style={{
                width: "30%",
                padding: "10px",
                borderRadius: "3px",
                border: "none",
                textAlign: "center",
              }}
              type="number"
              name="altura-mdf"
              value={estimativa.mdf.altura}
              onChange={(e) =>
                setEstimativa({
                  ...estimativa,
                  mdf: {
                    ...estimativa.mdf,
                    altura: e.target.value,
                  },
                })
              }
            ></input>
          </div>
          <span>Volume:</span>
          <input
            style={{
              width: "100%",
              padding: "10px 20px",
              borderRadius: "3px",
              border: "none",
              textAlign: "center",
            }}
            type="number"
            name="chapas-mdf"
            value={estimativa.mdf.chapas}
            onChange={(e) =>
              setEstimativa({
                ...estimativa,
                mdf: {
                  ...estimativa.mdf,
                  chapas: e.target.value,
                },
              })
            }
          ></input>
          <span>Tempo estimado:</span>
          <input
            style={{
              width: "100%",
              padding: "10px 20px",
              borderRadius: "3px",
              border: "none",
              textAlign: "center",
            }}
            type="number"
            name="tempo-mdf"
            value={estimativa.mdf.tempo}
            onChange={(e) =>
              setEstimativa({
                ...estimativa,
                mdf: {
                  ...estimativa.mdf,
                  tempo: e.target.value,
                },
              })
            }
          ></input>
        </MaterialInfoContainer>
      </MiddleContainer>
      <LowerContainer>
        <SubmitButtonContainer>
          <button
            disabled={botaoCriar}
            onClick={submitOrcamento}
            style={{ width: "30%" }}
          >{`Salvar Estimativa${
            estimativa.laminado.tempo &&
            estimativa.fundido.tempo &&
            estimativa.fundido_zero.tempo &&
            estimativa.isopor.tempo &&
            estimativa.mdf.tempo
              ? " | Total de horas estimado: " +
                formatTempo(
                  estimativa.laminado.tempo +
                    estimativa.fundido.tempo +
                    estimativa.fundido_zero.tempo +
                    estimativa.isopor.tempo +
                    estimativa.mdf.tempo
                )
              : ""
          }`}</button>
        </SubmitButtonContainer>
      </LowerContainer>
    </Content>
  );
};

export default Index;
