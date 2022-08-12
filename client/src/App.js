import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element="Description Page" />
          <Route exact path="/user/:_id" element="user page" />
          <Route exact path="/main" element="Home of Feeds" />
          <Route exact path="/feed/:_id" element="recipe/feed page" />
        </Routes>
        {/* recipe cards */}
        {/* buttons */}
        {/* BsHeartFill */}
      </BrowserRouter>
    </div>
  );
};

export default App;
