// import { useEffect, useState } from "react";
// import Loading from "./Loading";
import styled from "styled-components";

const LandingPage = () => {
  // const [foodArr, setFoodArr] = useState([]);

  // useEffect(() => {
  //   for (let i = 0; i < 6; i++) {
  //     fetch("https://foodish-api.herokuapp.com/api/")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         return setFoodArr((foodArr) => [...foodArr, data.image]);
  //       });
  //   }
  // }, []);

  // if (foodArr.length !== 12) {
  //   return <Loading />;
  // }

  return (
    <MainWrapper>
      <DescDiv>
        <Catto
          src="https://media.giphy.com/media/gpVDfYCRDeTy8/giphy.gif"
          alt="dancing cat for food"
        />
        <TextDiv>
          <h1>Welcome to Cthuwu~!</h1>
          <p>Social media for sharing, discovering and discussing Recipes</p>
        </TextDiv>
      </DescDiv>
      {/* <Wrapper>
        {foodArr.map((foodPic) => {
          return (
            <>
              <FoodImg src={foodPic} />
            </>
          );
        })}
      </Wrapper> */}
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// const Wrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
// `;

const DescDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

// const FoodImg = styled.img`
//   width: 33.33vw;
//   height: 16vh;
//   object-fit: cover;
// `;

const Catto = styled.img`
  width: 10em;
  object-fit: contain;
`;

export default LandingPage;
