import {movieSort} from '../ts/functions'
import { IMovie } from '../ts/models/Movie';

describe("tests for movieSort()", () => {
    
    test("should sort movies by name", () => {
        // Arrange
        const movies: IMovie[] = [
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
    
        // Act
        const result = movieSort(movies, true);
    
        // Assert
        expect(result[0].Title).toBe("Arga barn");

    });
    
    test("should sort by name descending", () => {
        // Arrange
        const movies: IMovie[] = [
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
    
        // Act
        const result = movieSort(movies, false);
    
        // Assert
        expect(result[0].Title).toBe("Glada barn");

    });

    test("should keep the order if same name, descending", () => {
        // Arrange
        const movies: IMovie[] = [
            {
                Title: "Bästa barn",
                imdbID: "Alltid",
                Type: "dokumentär",
                Poster: "...",
                Year: "2023",
            },
          {
                Title: "Bästa barn",
                imdbID: "Alltid",
                Type: "dokumentär",
                Poster: "...",
                Year: "2023",
            },
        ]
        // Act
        const result = movieSort(movies, true);

        // Assert
        expect(result[0].Type).toBe("dokumentär");

    })

    test("should keep the order if same name, ascending", () => {
        // Arrange
        const movies: IMovie[] = [
            {
                Title: "Bästa barn",
                imdbID: "Alltid",
                Type: "dokumentär",
                Poster: "...",
                Year: "2023",
            },
          {
                Title: "Bästa barn",
                imdbID: "Alltid",
                Type: "såpopera",
                Poster: "...",
                Year: "2023",
            },
        ]
        // Act
        const result = movieSort(movies, false);

        // Assert
        expect(result[0].Type).toBe("dokumentär");
    })
})