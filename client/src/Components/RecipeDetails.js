import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({});
  const [loaded, setLoaded] = useState(false);
  const recipeID = useParams()._id;
  useEffect(() => {
    fetch(`/api/feed/${recipeID}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data.feed);
        setLoaded(true);
      });
  }, []);

  if (!loaded) {
    return <Loading />;
  }
  
  return (
    <MainWrapper>
      {recipe &&
        recipe.recipeCard.recipe.map((element) => {
          return (
            <Wrapper key={Math.floor(Math.random() * 10000)}>
              <h1>{element.title}</h1>
              <Img src={element.img} />
              <TimeIng>
                <p>{element.ingredients}</p>
                <p>{element.cookingtime}</p>
              </TimeIng>
              <p>{element.description}</p>
            </Wrapper>
          );
        })}
      {recipe.comments ? (
        recipe.comments.map((element) => {
          return (
            <CommentDiv key={Math.floor(Math.random() * 10000)}>
              <h1>Comments</h1>
              <textarea />
              <button>Add Comment</button>
              <p>{element.uname}</p>
              <p>{element.comment}</p>
            </CommentDiv>
          );
        })) : (
          
            <CommentDiv>
              <h1>Comments</h1>
              <textarea />
              <button>Add Comment</button>
            </CommentDiv>
          
        )}
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  border: 1px solid #f9f9f9;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 2em;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Img = styled.img`
  width: 90vw;
  object-fit: contain;
  max-height: 60vh;
`;

const TimeIng = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentDiv = styled.form`
  display: flex;
  flex-direction: column;
`;

export default RecipeDetails;
