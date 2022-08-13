import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import MainPage from "./MainPage";
import styled from "styled-components";

const App = () => {
  return (
    <Wrapper>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/user/:_id" element="user page" />
          <Route exact path="/main" element={<MainPage />} />
          <Route exact path="/feed/:_id" element="recipe/feed page" />
        </Routes>
        {/* recipe cards */}
        {/* buttons */}
        {/* BsHeartFill */}
      </BrowserRouter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
`;

export default App;
