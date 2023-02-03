/**
 * @jest-environment jsdom
 */

import { IMovie } from '../ts/models/Movie';
import { getData } from '../ts/services/movieservice';
import * as appFunctions from '../ts/movieApp'

beforeEach (()  => {
    document.body.innerHTML = " ";
     
    });

jest.mock("../ts/services/movieservice.ts");


/************************************************************************************
 *                      INIT
 ************************************************************************************/

describe('should test all parts of init function', () => {
    test('should spy on handleSubmit', () => {
        //arrange 
        document.body.innerHTML = 
        `<form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
        </form>`;

        let spyOnHandleSubmit = jest.spyOn(appFunctions, "handleSubmit")
        .mockReturnValue(new Promise<void>((resolve)=> {
        resolve();
        })
        );  

        let form = document.getElementById("searchForm") as HTMLFormElement

        //act
        appFunctions.init();
        form.submit();

        //assert
        (document.querySelector("#searchForm") as HTMLFormElement).submit();
        expect(spyOnHandleSubmit).toHaveBeenCalled();
        spyOnHandleSubmit.mockRestore();
    })
})

/************************************************************************************
 *                      HANDLE SUBMIT
 ************************************************************************************/

describe('should test all parts of handleSubmit function', () => {

    test('should create html if movie is found', async () => {
        //arrange
        document.body.innerHTML = 
        ` <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
        </form> 
        <div id="movie-container"></div>`;

        (document.getElementById("searchText") as HTMLInputElement).value = "Glada barn";
        let movies :IMovie [] = await getData('Glada barn')

        //act
        await appFunctions.handleSubmit()

        //assert
        expect(movies[0].Title).toBe('Glada barn');

    })

    test('should spy on createHTML', async () => {
        //arrange
        document.body.innerHTML = 
        ` <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
        </form> 
        <div id="movie-container"></div>`;

        (document.getElementById("searchText") as HTMLInputElement).value = "Glada barn";

        let spyOnCreateHtml = jest.spyOn(appFunctions, 'createHtml').mockReturnValue();
        
        //act
        await appFunctions.handleSubmit()

        //assert
        expect(spyOnCreateHtml).toHaveBeenCalled();
        spyOnCreateHtml.mockRestore();

    })

    test('should spy on display No result if no movie is found', async() => {
        //arrange
        document.body.innerHTML = 
        ` <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här"/>
        <button type="submit" id="search">Sök</button>
        </form> 
        <div id="movie-container"></div>`;

        (document.getElementById("searchText") as HTMLInputElement).value = "dagen som aldrig tog slut";
        
        let spyOnDisplayNoResult = jest.spyOn(appFunctions, "displayNoResult").mockReturnValue();

        //act
        await appFunctions.handleSubmit();
        
        //assert
        expect(spyOnDisplayNoResult).toHaveBeenCalled();
        spyOnDisplayNoResult.mockRestore();
    })

    test('should spy on display No result in catch', async() => {
        //arrange
        document.body.innerHTML = 
        ` <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här"/>
        <button type="submit" id="search">Sök</button>
        </form> 
        <div id="movie-container"></div>`;

        (document.getElementById("searchText") as HTMLInputElement).value = "error"
        let spyOnDisplayNoResult = jest.spyOn(appFunctions, "displayNoResult").mockReturnValue();

        //act
        await appFunctions.handleSubmit();
        
        //assert
        expect(spyOnDisplayNoResult).toHaveBeenCalled();
        spyOnDisplayNoResult.mockRestore();
    })
})

/************************************************************************************
 *                      CREATE HTML
 ************************************************************************************/
describe ('should test all parts of create html function', () => {

    test('should print movies to html', () => {
        //arrange
        document.body.innerHTML =`<div id="movie-container"></div>`;
        const movies: IMovie[] = [
            {   Title: "Glada barn",
                imdbID: "när då",
                Type: "humor",
                Poster: "...",
                Year: "2021"},
            {
                Title: "arga barn",
                imdbID: "alltid",
                Type: "relaism",
                Poster: "...",
                Year: "2023", 
            } ]
            let movieListPlacement: HTMLDivElement = document.getElementById(
                "movie-container"
              ) as HTMLDivElement;

        //act
        appFunctions.createHtml(movies, movieListPlacement)

        //assert
        const moviePlacementResult = document.querySelectorAll(".movie");

        expect(movies[0].Title).toBe("Glada barn");
        expect(moviePlacementResult?.length).toBe(2);
    })
})
/************************************************************************************
 *                      DISPLAY NO RESULT
 ************************************************************************************/
test('should display no results', () => {
    //arrange
    document.body.innerHTML =`<div id="movie-container"></div>`;
    const noMessageContainer: HTMLDivElement = 
    document.getElementById("movie-container") as HTMLDivElement
    
    //act
    appFunctions.displayNoResult(noMessageContainer);

    //assert
    expect(noMessageContainer.innerHTML).toContain("Inga sökresultat att visa");
})