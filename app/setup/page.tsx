import { auth, signOut } from "@/auth";
import SetupControls from "@/components/setup-form/setup-controls";
import UserDataEditor from "@/components/setup-form/user-data-editor";
import { readUserData } from "@/lib/config-editor";

async function SetupPage() {
  const session = await auth();

  let username: string,
    password: string,
    collection: string,
    defDatabase: string,
    name: string;

  if (session && session.user.email) {
    //console.log(session);
    const { user } = session;
    const { email, id, image } = user;
    //console.log(email);

    const userProfile = await readUserData(email);
    username = userProfile.username;
    password = userProfile.password;
    collection = userProfile.collection;
    defDatabase = userProfile.defDatabase;

    if (session.user.name) {
      name = session.user.name;
    } else {
      name = userProfile.name;
    }
  }

  return (
    <main>
      {!session && <SetupControls />}
      {session && (
        <UserDataEditor
          nameInput={name}
          usernameInput={username}
          passwordInput={password}
          collectionInput={collection}
          defDatabaseInput={defDatabase}
        />
      )}
    </main>
  );
}

export default SetupPage;
