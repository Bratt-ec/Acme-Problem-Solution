const fs = require("fs");

describe('Tests to verify the file .txt', ()=>{
    test('Verify if exist employes.txt', () => {
        expect(fs.existsSync('./employes.txt')).toBe(true);
    });
    test('Verify if dont exist employesdata.txt', () => {
        expect(fs.existsSync('./employesdata.txt')).toBe(false);
    });
});