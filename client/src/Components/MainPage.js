import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";

const MainPage = () => {
  const [feeds, setFeeds] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/feeds")
      .then(async (res) => res.json())
      .then((data) => {
        setFeeds(data.feeds);
        setLoaded(true);
      })
      .catch((e) => console.log(e));
  }, []);

  if (!loaded) {
    return <Loading />;
  }

  const handleRecipeDetails = (url) => {
    navigate(url);
  };

  return (
    <MainWrapper>
      {feeds &&
        feeds
          .slice(0)
          .reverse()
          .map((feed) => {
            return feed.recipeCard.recipe.map((element) => {
              return (
                <Wrapper
                  onClick={() => handleRecipeDetails(`/feed/${feed._id}`)}
                >
                  <EleDiv>
                    <h1>Title: </h1>
                    {element.title}
                  </EleDiv>
                  <Img src={element.img} alt={`picture of ${element.title}`} />
                  <EleDiv>
                    <h2>Ingredients: </h2>
                    {element.ingredients}
                  </EleDiv>
                  <EleDiv>{element.time}</EleDiv>
                </Wrapper>
              );
            });
          })}
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  margin: 5px 1em;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 5px;
  padding: 5px;
  align-items: center;
  border: 1px solid lightskyblue;
`;

const EleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const Img = styled.img`
  width: 60vw;
  object-fit: contain;
`;

export default MainPage;
