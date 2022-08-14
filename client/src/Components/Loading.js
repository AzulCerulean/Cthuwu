import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <Gif src="https://media.giphy.com/media/Ig9phyxs1ePIBSZDKS/giphy.gif" alt="cthulhu playing a game" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  justify-content: center;
`;

const Gif = styled.img`
  max-height: 12em;
  object-fit: contain;
`;

export default Loading;
