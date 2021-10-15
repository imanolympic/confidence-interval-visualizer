import AppStyle from "./App.scss";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <div class={AppStyle.App}>
      <HomePage />
    </div>
  );
}

export default App;
