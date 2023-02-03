import { testData } from '../ts/services/__mocks__/movieservice';
import {getData} from '../ts/services/movieservice';

jest.mock("axios", () =>  ({
    get: async (url:string) => {
        return new Promise ((resolve, reject) => {
            if(url.endsWith("error")) {
                reject ([]);
            }
            else {
                resolve ({data: {Search: testData}})
                
            }
        })
    }
}));

test ('should get data correctly', async () => {
        //arrange

        //act  
        let response = await getData('txt');

        //assert
        expect(response.length).toBe(3);
    
});

test ('should not get data', async () => {
    try {
  
        let response = await getData('error')

    }
    catch(error: any){

        expect(error.length).toBe(0)
    }
});