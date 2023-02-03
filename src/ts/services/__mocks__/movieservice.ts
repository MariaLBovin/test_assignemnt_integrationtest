import { IMovie } from "../../models/Movie";

export let testData : IMovie[] = [
    {
        Title: "Glada barn",
        imdbID: "Alltid",
        Type: "humor",
        Poster: "...",
        Year: "2022",
    },
    {
        Title: "Arga barn",
        imdbID: "Alltid",
        Type: "realism",
        Poster: "...",
        Year: "2022",
    },
    {
        Title: "Bästa barn",
        imdbID: "Alltid",
        Type: "dokumentär",
        Poster: "...",
        Year: "2023",
    },
];

export const getData = async (searchText: string): Promise<IMovie[]> => {
    return new Promise((resolve, reject) => {
        if (searchText !== 'error'){
            resolve(testData.filter((testData) => testData.Title.includes(searchText)))
        }else {
            reject ([])
        }
    });
}