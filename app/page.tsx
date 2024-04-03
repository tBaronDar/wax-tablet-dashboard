import Hero from "@/components/home-page/hero";
import MessagesTable from "@/components/home-page/messages-table";
import SetupForm from "@/components/home-page/setup-form/form";

import { readJsonData } from "@/lib/get-file-data";
import { mongoGet } from "@/lib/mongoDB-handler";

async function HomePage() {
  const setupData = await readJsonData();

  const { username, password } = setupData;

  const mongoData = await mongoGet();

  const { messages, collectionsNames, databasesNames } = mongoData;

  return (
    <section>
      <Hero />
      <SetupForm
        username={username}
        password={password}
        collections={collectionsNames}
        databases={databasesNames}
      />
      <MessagesTable messages={messages} />
    </section>
  );
}

export default HomePage;
