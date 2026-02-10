import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";

function Main() {
  return (
    <main className="main">
      <section className="main__hero">
        <h2 className="main__title">What's going on in the world?</h2>
        <p className="main__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm />
      </section>

      {/*Results section will go here later*/}

      <About />
    </main>
  );
}

export default Main;
