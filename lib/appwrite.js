import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';
export const config = {
    endpoint: 'http://cloud.appwrite.io/v1',
    platform: 'com.josh.aora',
    projectId: '666ae188001bef3fd801',
    databaseId: '666ae3e3002ead561729',
    userCollectionId: '666ae43400022f5de0d2',
    videoCollectionId: '666ae4a4000c4135762f',
    storageId: '666aea14000d2e93b34a'
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionI,
  videoCollectionId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

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

export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
     
    if(!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('account', currentAccount.$id)]
    )

    if(!currentUser) throw Error;

    return currentUser.documents[0];
  }catch (error) {
    console.log(error);
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc('$createdAt')]
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.search('title', query)]
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
    throw new Error(error);
  }

}

export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type === 'video') {
      fileUrl = storage.getFileView(storageId, fileId)
    } else if (type === 'image') {
      fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
    } else {
      throw new Error ('Invalid file type');
    }

    if(!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export const uploadFile = async (file, type) => {
  if(!file) return;

  // const { mimeType, ...rest } = file;
  const asset = {
     name: file.fileName,
     type: file.mimeType,
     size: file.fileSize,
     uri:file.uri,
   };

  try {
    const uploadFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadFile.$id, type);

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export const createVideo = async (form ) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnailUrl, 'image'),
      uploadFile(form.videoUrl, 'video'),
    ])

    const newPost = await databases.createDocument(
      databaseId, videoCollectionId, ID.unique(), {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId
      }
    )
    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}