import { CreateUserParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  Platform: "com.honore/quickbite",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "6877ca0b002e97ed3741",
  userCollectionId: "6877caa1002ececa94e5",
};

// Create a new Appwrite client instance
export const client = new Client();

// Initialize the Appwrite client
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.Platform);

// Set up the Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

// Function to create a new user
export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) {
      throw Error;
    }

    await signIn({ email, password });

    //const avatarUrl = await avatars.getInitials(name);

    // Create a new user document in the database
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        avatar: await avatars.getInitials(name),
        email,
        name,
      }
    );

    return newUser;
  } catch (e) {
    throw new Error(e as string);
  }
};

// Function to sign in a user
export const signIn = async ({ email, password }: SignInParams) => {
  // Check if email and password are provided
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (e) {
    throw new Error(e as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw Error;
    }
    // Fetch the user document from the database using the account ID
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    // Check if the user document exists
    if (!currentUser) throw Error;
    // Return the first user document
    return currentUser.documents[0];
  } catch (e) {
    throw new Error(e as string);
  }
};
