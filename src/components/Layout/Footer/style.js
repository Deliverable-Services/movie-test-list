import styled from "styled-components";

export const FooterContainer = styled.div`
  height: 12vh;
  .image-container {
    height: 100%;
    background-image: url("/assets/images/footerStyle.svg");
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;

    @media screen and (max-width: 520px) {
      background-image: url("/assets/images/footerStyleMob.svg");
    }
  }
`;
