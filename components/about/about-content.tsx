import classes from "./about-content.module.css";

function AboutContent() {
  return (
    <div className={classes.master}>
      <h2>About this website</h2>
      <ul className={classes.list}>
        <li>
          <h3>
            This app is a tool that helps users access and delete messages from
            a MongoDb database.
          </h3>
        </li>
        <li>
          <h3>
            The credentials are provided by me, the administrator of the site.
          </h3>
        </li>
        <li>
          <h3>How it works:</h3>
        </li>
        <li>Fist create an account or login.</li>
        <li>
          Second click the Edit data button and save the MongoDb credentials
        </li>
        <li>
          If you don&apos;t have your own credentials use these dummy
          credentials instead:
        </li>
        <li>
          Username: <strong>thebaron</strong>
        </li>
        <li>
          Password: <strong>RwXS2VsiZvfez7B</strong>
        </li>
        <li>
          Finally click on the Connect button to be taken to the messages.
        </li>
      </ul>
    </div>
  );
}

export default AboutContent;
