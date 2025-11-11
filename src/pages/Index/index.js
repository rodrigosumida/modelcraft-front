import React from "react";

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
} from "./styled";
import Header from "../../components/Header";

const Index = () => {
  return (
    <Content>
      <Header />
      <TopContainer>
        <InputsSection>
          <LeftInputSection>
            <LogoContainer>
              <img
                src="https://grvsoftware.com.br/wp-content/themes/yootheme/cache/01383948000136-a8a98bab.png"
                alt="Logo Modelcraft"
              />
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
                    ></input>
                  </InputSizerContainer>
                </InputSizesContainer>
                <SubmitButtonContainer>
                  <button style={{ width: "100%" }}>Gerar</button>
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
              Alumínio Laminado a Zero
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
            <span style={{ fontWeight: "bold", fontSize: "1rem" }}>Chapas</span>
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
          ></input>
        </MaterialInfoContainer>
      </MiddleContainer>
    </Content>
  );
};

export default Index;
