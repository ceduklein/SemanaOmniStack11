//inporta a funcionaliade a ser testada
const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = generateUniqueId();

        //verifica se o id tem 8 caracteres
        expect(id).toHaveLength(8);
    })
})