import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import MainPage from "./MainPage";
import styled from "styled-components";
import RecipeDetails from "./RecipeDetails";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import UserDetails from "./UserDetails";
import NewFeed from "./NewFeed";

const App = () => {
  return (
    <Wrapper>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/main" element={<MainPage />} />
          <Route exact path="/newfeed" element={<NewFeed />} />
          <Route exact path="/feed/:_id" element={<RecipeDetails />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/user/:_id" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
`;

export default App;
