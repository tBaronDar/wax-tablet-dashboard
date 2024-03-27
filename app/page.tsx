import Hero from "@/components/home-page/hero";
import MessagesTable from "@/components/home-page/messages-table";

function HomePage() {
  return (
    <section>
      <Hero />
      <MessagesTable />
    </section>
  );
}

export default HomePage;

export function getStaticProps() {}
