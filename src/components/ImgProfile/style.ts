import styled from "styled-components";

export const StyledContainerImgProfile = styled.div`
  width: 210px;
  height: 210px;
  background-color: transparent;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
  }
`;

export const StyledContainerImgModal = styled.div`
  width: 50px;
  height: 50px;
  background-color: transparent;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
  }
`;

export const StyledContainerImgHome = styled.div`
  width: 150px;
  height: 150px;
  background-color: transparent;

  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;

    transition: 150ms ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
