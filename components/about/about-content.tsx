import classes from "./about-content.module.css";

function AboutContent() {
	return (
		<div className={classes.master}>
			<h2>About this website</h2>
			<p>
				This app is a tool that helps users access and delete messages from a
				MongoDb database.
			</p>
			<p>
				The credentials are provided by me, the administrator of the site. Once
				you register them onto this site the messages will appear automatically
				when you login.
			</p>
		</div>
	);
}

export default AboutContent;
