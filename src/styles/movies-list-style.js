import styled from "styled-components";

export const MoviesListContainer = styled.div`
  width: 100%;
  .movie-list-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 120px;

    @media only screen and (max-width: 520px) {
      padding: 0px 24px;
    }
    h2 {
      font-family: Montserrat;
      font-size: 48px;
      font-weight: 600;
      line-height: 56px;
      display: flex;
      align-items: center;
      gap: 12px;

      @media only screen and (max-width: 520px) {
        font-size: 32px;
        line-height: 40px;
      }
    }

    p {
      font-family: Montserrat;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      display: flex;
      align-items: center;
      gap: 12px;

      span {
        @media only screen and (max-width: 520px) {
          display: none;
        }
      }
    }
  }
  .movie-list-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 60px 120px;

    @media only screen and (max-width: 1100px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media only screen and (max-width: 991px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media only screen and (max-width: 520px) {
      grid-template-columns: repeat(2, 1fr);
      padding: 80px 24px;
    }
  }

  .next-btn,
  .prev-btn {
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
    background: transparent;
    border: none;
  }

  .next-btn {
    margin-left: 11px;
  }
  .prev-btn {
    margin-right: 11px;
  }

  .page-number {
    margin: 0 5px;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
  }

  .empty-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 0px 24px;
    h2 {
      font-family: Montserrat;
      font-size: 48px;
      font-weight: 600;
      line-height: 56px;

      @media only screen and (max-width: 520px) {
        font-size: 32px;
        font-weight: 600;
        line-height: 40px;
        text-align: center;
        max-width: 380px;
      }
    }

    .add-new-movie {
      max-width: 380px;
    }
  }
`;
