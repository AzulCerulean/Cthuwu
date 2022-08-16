import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

const NewFeed = () => {
  //bring context for conditional rendering and data
  const { currentUser, authenticated } = useContext(UserContext);

  const navigate = useNavigate();

  //create states to hold user input
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [ingregients, setIngredients] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  //create HandlerFunctions for each State/input
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleImg = (e) => {
    setImg(e.target.value);
  };
  const handleIngredients = (e) => {
    setIngredients(e.target.value);
  };
  const handleTime = (e) => {
    setTime(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  //create handler with POST fetch and feed data to the db
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/feed", {
      method: "POST",
      body: JSON.stringify({
        recipeCard: {
          userID: currentUser.newData._id,
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

    navigate(`/main`);
    window.alert("Recipe Created!");
  };

  return (
    <MainWrapper>
      <h1>New Recipe</h1>
      <Form onSubmit={handleSubmit}>
        <FormDiv1>
          <h1>Title:</h1>
          <input
            type="text"
            placeholder="Enter a title"
            required
            onChange={handleTitle}
          />
        </FormDiv1>
        <FormDiv1>
          <h1>Image:</h1>
          <input type="url" placeholder="enter img url" onChange={handleImg} />
        </FormDiv1>
        {/* <FormDiv1>
          <p>or :</p>
          <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImg} />
        </FormDiv1> */}
        <TextADiv>
          <h1>Ingredients:</h1>
          <textarea
            rows="5"
            cols="33"
            placeholder="Enter recipe ingredients here"
            maxLength="1000"
            required
            onChange={handleIngredients}
          />
        </TextADiv>
        <FormDiv1>
          <h1>Time:</h1>
          <input
            type="text"
            placecolder="How Long does the recipe take to make?"
            required
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
            required
            onChange={handleDescription}
          />
        </TextADiv>
        <button>
          <p>Submit</p>
        </button>
      </Form>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid lightskyblue;
  padding: 5px;
  margin: 1em;
  gap: 1em;
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

export default NewFeed;
