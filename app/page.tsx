import Hero from "@/components/home-page/hero";
import MessagesTable from "@/components/home-page/messages-table";
import SetupPage from "./setup/page";

function HomePage() {
  return (
    <section>
      <Hero />
      <SetupPage />
      <MessagesTable />
    </section>
  );
}

export default HomePage;

//export function getStaticProps() {}
