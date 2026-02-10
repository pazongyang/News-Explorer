import "./About.css";

function About() {
  return (
    <section className="about">
      <div className="about__image-placeholder">Placeholder image</div>
      <div className="about__content">
        <h3 className="about__title">About the author</h3>
        <p className="about__text">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know. You
          can also talk about your experience with TripleTen, what you learned
          there, and how you can help potential customers
        </p>
      </div>
    </section>
  );
}

export default About;
