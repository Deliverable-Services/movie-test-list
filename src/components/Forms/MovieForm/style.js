import styled from "styled-components";

export const MovieFormContainer = styled.div`
  width: 100%;
  padding: 0px 120px 89px;

  @media only screen and (max-width: 520px) {
    padding: 0px 24px;
  }

  h2 {
    font-family: Montserrat;
    font-size: 48px;
    font-weight: 600;
    line-height: 56px;
    margin-bottom: 120px;

    @media only screen and (max-width: 520px) {
      margin-bottom: 80px;
      font-size: 32px;
      line-height: 40px;
    }
  }

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 127px;

    @media only screen and (max-width: 991px) {
      gap: 40px;
    }

    @media only screen and (max-width: 768px) {
      display: block;
    }

    .web-image-dropzone {
      width: 100%;
      height: 504px;
      border: 2px dashed #ffffff;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      @media only screen and (max-width: 768px) {
        display: none;
      }
    }

    .movie-info {
      display: flex;
      flex-direction: column;
      gap: 24px;

      .title-field {
        width: 100%;
        max-width: 362px;
        height: 45px;

        @media only screen and (max-width: 768px) {
          max-width: unset;
        }
      }

      .publish-field {
        height: 45px;
        @media only screen and (max-width: 768px) {
          max-width: unset;
        }
      }

      .mob-image-dropzone {
        display: none;

        @media only screen and (max-width: 768px) {
          display: block;
          height: 372px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .action-buttons {
        margin-top: 40px;
        display: flex;
        gap: 16px;
        .cancel-button {
          background: transparent;
          border: 1px solid #ffffff;
          width: 100%;
          max-width: 167px;
        }
        .submit-button {
          width: 100%;
          max-width: 179px;
        }

        .cancel-button,
        .submit-button {
          @media only screen and (max-width: 520px) {
            max-width: unset;
          }
        }
      }
    }
  }
`;
