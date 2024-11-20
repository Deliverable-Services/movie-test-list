import styled from "styled-components";

export const SignInContainer = styled.div`
  width: 300px;
  height: 360px;
  h1 {
    font-family: Montserrat;
    font-size: 64px;
    font-weight: 600;
    line-height: 80px;
    text-align: center;
    margin-bottom: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .remember-me {
    text-align: center;
    input {
      margin-right: 8px;
      background: var(--input-color);
      color: var(--input-color);
    }
  }
`;
