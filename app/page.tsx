import Hero from "@/components/home-page/hero";
import MessagesTable from "@/components/home-page/messages-table";
import SetupForm from "@/components/home-page/setup-form";

import { readJsonData } from "@/lib/get-file-data";
import { mongoGet } from "@/lib/mongoDB-handler";

async function HomePage() {
  const setupData = await readJsonData();
  const mongoData = await mongoGet();

  return (
    <section>
      <Hero />
      <SetupForm setupData={setupData} />
      <MessagesTable data={mongoData} />
    </section>
  );
}

export default HomePage;
