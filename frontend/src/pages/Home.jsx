import ErrorBanner from "../components/ErrorBanner";
import SearchBar from "../components/SearchBar";
import Todos from "../components/Todos";

function Home() {
  return (
    <>
      <ErrorBanner />
      <SearchBar />
      <Todos />
    </>
  );
}

export default Home;
