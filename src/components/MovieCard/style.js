import styled from "styled-components";

export const MovieCardContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 504px;
  padding: 8px;
  background: var(--card-color);
  border-radius: 12px;

  @media only screen and (max-width: 520px) {
    max-width: 100%;
    max-height: 334px;
    padding: 0px;
  }

  img {
    width: 100%;
    height: 400px;
    border-radius: 12px;
    object-fit: cover;
    margin-bottom: 16px;

    @media only screen and (max-width: 520px) {
      height: 246px;
    }
  }

  .movie-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0px 8px 8px;

    @media only screen and (max-width: 520px) {
      padding: 0px 12px 12px;
    }

    h3 {
      font-family: Montserrat;
      font-size: 20px;
      font-weight: 500;
      line-height: 32px;
    }

    p {
      font-family: Montserrat;
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
    }
  }
`;
