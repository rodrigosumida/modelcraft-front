import styled from "styled-components";

export const TopContainer = styled.section`
  height: 30%;
  width: 100%;
  display: flex;
`;

export const InputsSection = styled.div`
  width: 70%;
`;

export const LeftInputSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const LogoContainer = styled.div`
  height: 50%;
  width: 100%;
  padding: 15px 10px;
  display: flex;
`;

export const ProductInfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: flex-end;
`;

export const InputsContainer = styled.div`
  flex: 1;
  display: flex;
`;

export const UploadButtonContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SizesContainer = styled.div`
  flex: 1;
  display: flex;
`;

export const InputSizesContainer = styled.div`
  height: 100%;
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const InputSizerContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonContainer = styled.div`
  flex: 1;
  display: flex;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
`;

export const ExtraInfoSection = styled.div`
  flex: 1;
  padding: 10px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;

  .single {
    grid-column: 1 / -1;
  }
`;

export const ExtraInfoContainer = styled.div`
  background-color: #c72020;
  border-radius: 5px;
  padding: 10px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  span {
    color: #fff;
    font-weight: bold;
  }
`;

export const MiddleContainer = styled.section`
  height: 40%;
  width: 100%;
  display: grid;
  padding: 0 10px;
  gap: 20px;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
`;

export const MaterialInfoContainer = styled.div`
  border: 1px solid #515151;
  border-radius: 5px;
  padding: 15px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  min-height: 300px;
  width: 100%;

  box-shadow: 4px 5px 31px -5px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 4px 5px 31px -5px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 4px 5px 31px -5px rgba(0, 0, 0, 0.7);

  span {
    color: #515151;
    font-size: 0.9rem;
  }
`;

export const LowerContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
