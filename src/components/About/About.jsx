import "./About.css";
import avatar from "../../assets/images/avatar.png";

function About() {
  return (
    <section className="about">
      <div className="about__image">
        <img className="about__avatar" src={avatar} alt="Avatar" />
        <p className="about__placeholder">
          <span>Placeholder image</span>
          <span>Put an image of yourself here.</span>
        </p>
      </div>
      <div className="about__content">
        <h3 className="about__title">About the author</h3>
        <p className="about__text">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>
        <p className="about__text">
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers
        </p>
      </div>
    </section>
  );
}

export default About;
