import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import Loading from "./Loading";

const RecipeDetails = () => {
  const { currentUser, authenticated } = useContext(UserContext);
  const [recipe, setRecipe] = useState({});
  const [loaded, setLoaded] = useState(false);
  const recipeID = useParams()._id;
  const navigate = useNavigate();

  //state for showing the edit form
  const [editForm, setEditForm] = useState(false);
  //trigger the edit form
  const showEdit = () => setEditForm(!editForm);

  //PATCH the recipe
  //create states to hold user input
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [ingregients, setIngredients] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  //create HandlerFunctions for each State/input
  const handleTitle = (e) => {
    if (e.target.value === "") {
      setTitle(recipe.recipeCard.recipe[0].title);
    } else {
      setTitle(e.target.value);
    }
  };
  const handleImg = (e) => {
    if (e.target.value === "") {
      setImg(recipe.recipeCard.recipe[0].img);
    } else {
      setImg(e.target.value);
    }
  };
  const handleIngredients = (e) => {
    if (e.target.value === "") {
      setIngredients(recipe.recipeCard.recipe[0].ingredients);
    } else {
      setIngredients(e.target.value);
    }
  };
  const handleTime = (e) => {
    if (e.target.value === "") {
      setTime(recipe.recipeCard.recipe[0].time);
    } else {
      setTime(e.target.value);
    }
  };
  const handleDescription = (e) => {
    if (e.target.value === "") {
      setDescription(recipe.recipeCard.recipe[0].description);
    } else {
      setDescription(e.target.value);
    }
  };

  //GET data from db for the recipe
  useEffect(() => {
    fetch(`/api/feed/${recipeID}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data.feed);
        setLoaded(true);
      });
  }, []);

  //when triggred, finish editting and PATCH
  const patchHandler = async (e) => {
    e.preventDefault();

    await fetch(`/api/feed/${recipeID}`, {
      method: "PATCH",
      body: JSON.stringify({
        recipeCard: {
          userID: recipe.recipeCard.userID,
          recipe: [
            {
              title: title,
              img: img,
              ingredients: ingregients,
              time: time,
              description: description,
            },
          ],
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    navigate("#");
    window.alert("Recipe Updated!");
    setEditForm(false);

    fetch(`/api/feed/${recipeID}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data.feed);
        setLoaded(true);
      });
  };
  //when triggered, delete post
  const deleteHandler = () => {
    fetch(`/api/feed/${recipeID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    navigate("/main");
  };

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

      {recipe &&
        authenticated &&
        currentUser.newData._id === recipe.recipeCard.userID && (
          <>
            {!editForm ? (
              <PatchButton onClick={showEdit}>
                <p>Edit Recipe</p>
              </PatchButton>
            ) : (
              <Form onSubmit={patchHandler}>
                <FormDiv1>
                  <h1>Title:</h1>
                  <input type="text" onChange={handleTitle} />
                </FormDiv1>
                <FormDiv1>
                  <h1>Image:</h1>
                  <input
                    type="url"
                    placeholder="enter img url"
                    onChange={handleImg}
                  />
                </FormDiv1>
                <FormDiv1>
                  <p>or :</p>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImg}
                  />
                </FormDiv1>
                <TextADiv>
                  <h1>Ingredients:</h1>
                  <textarea
                    rows="5"
                    cols="33"
                    placeholder="Enter recipe ingredients here"
                    maxLength="1000"
                    onChange={handleIngredients}
                  />
                </TextADiv>
                <FormDiv1>
                  <h1>Time:</h1>
                  <input
                    type="text"
                    placecolder="How Long does the recipe take to make?"
                    onChange={handleTime}
                  />
                </FormDiv1>
                <TextADiv>
                  <h1>Recipe:</h1>
                  <textarea
                    rows="8"
                    cols="33"
                    placeholder="Enter recipe details here! ~"
                    maxLength="1000"
                    onChange={handleDescription}
                  />
                </TextADiv>
                <button>
                  <p>Submit</p>
                </button>
              </Form>
            )}

            <DeleteButton onClick={deleteHandler}>delete</DeleteButton>
          </>
        )}

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
        })
      ) : (
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

const PatchButton = styled.button`
  color: black;
  background-color: yellow;
  border: none;
  border-radius: 5px;
  width: 30vw;
`;

const DeleteButton = styled.button`
  color: white;
  background-color: crimson;
  border: none;
  border-radius: 5px;
  width: 30vw;
  &:active {
    scale: 0.9;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;
const FormDiv1 = styled.div`
  display: flex;
  gap: 1em;
`;
const TextADiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export default RecipeDetails;
