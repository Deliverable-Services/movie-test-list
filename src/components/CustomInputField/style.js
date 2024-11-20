import styled from "styled-components";

export const CustomInputContainer = styled.div`
  input {
    width: 100%;
    max-width: 300px;
    height: 45px;
    border-radius: 10px;
    background: var(--input-color);
    color: #fff;
    border: none;
    padding: 11px 16px;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;

    &::placeholder {
      color: #fff;
    }
  }
`;
