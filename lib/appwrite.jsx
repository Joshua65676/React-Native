import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';
export const config = {
    endpoint: 'http://cloud.appwrite.io/v1',
    platform: 'com.josh.aora',
    projectId: '666ae188001bef3fd801',
    databaseId: '666ae3e3002ead561729',
    userCollectionId: '666ae43400022f5de0d2',
    videoCollectionId: '666ae4a4000c4135762f',
    storageId: '666aea14000d2e93b34a'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
      const newAccount = await account.create(
      ID.unique(), email, password, username)

      if(!newAccount) throw Error;

      const avatarUrl = avatars.getInitials(username);

      await signIn(email, password);

      const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl
        }
      )

      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error(error)
    }
}
