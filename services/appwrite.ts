// track the searches made by the users

import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);
// @ts-ignore
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('movie_id', movie.id)
    ]);


    //   const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
    //   Query.equal('searchTearm', query)
    // ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        { count: existingMovie.count + 1 }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTearm: query,          // raw user search
        movie_id: movie.id,          // unique key for movie
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        count: 1
      });
    }
  } catch (error) {
    console.log("Error updating search count:", error);
    throw error;
  }
};



export interface TrendingMovies {
  searchTearm: string;
  movie_id: number;
  title: string;
  poster_url: string;
  count: number;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
}

export const getTrendingMovies = async (): Promise<TrendingMovies[] | undefined> =>{
  try {

    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5), Query.orderDesc('count')
    ]);

    return result.documents as unknown as TrendingMovies[]
    
  } catch (error) {
    console.log(error)
    return undefined
  }
}

  // console.log("Updating search count for query:", query);
    // console.log("Movie data:", movie);

    // ✅ Corrected: use comma instead of semicolon and import Query

