import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import SignUp from "./pages/SignUp.jsx";
import LogIn from "./pages/LogIn.jsx";
import RecipeInput from "./pages/RecipeInput.jsx";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Index />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/recipe-input" element={<RecipeInput />} />
    </Routes>
  );
}

export default App;