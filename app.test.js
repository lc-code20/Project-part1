const request = require('supertest');
const app = require('./app').app;
const build = require('./app').createProduct;

// TEST THE REST API ENDPOINT FOR GET
describe('GET requests', () => {
    
    test('GET product/read endpoint, expect 200', async () => {
        const res = await request(app).get('/product/read')
        expect(res.statusCode).toBe(200);
    });

    test('GET bad endpoint, expect 404', async () => {
      const res = await request(app).get('/badEndPoint')
      expect(res.statusCode).toBe(404);
    });

});

// TEST THE REST API ENDPOINT FOR POST
describe('CREATE request', () => {
    
    test('CREATE product test', async () => {
        const res = await request(app).post('/newProduct').send({name: "prod", description: "red", price: 20});
        expect(res.statusCode).toBe(200);
    });

    test('CREATE product test 2 : expect failure', async () => {
        const res = await request(app).post('/newProduct').send({name: "prod", description: "red"});
        expect(res.statusCode).toBe(500);
    });


});

// UNIT TEST THE PRODUCT BUILDER
describe('Unit Tests', () => {

    test('product object creater', () => {
        
        let tProduct = "testProduct";
        let tDescription = "test function success case";
        let tPrice = 10;

        let product = {
            name: tProduct,
            description: tDescription,
            price: tPrice
        };

        let productFromFunction = build(tProduct, tDescription, tPrice);

        expect(productFromFunction).toStrictEqual(product);
        
    });

    test('product object creater2', () => {
        
        let tProduct = "testProduct2";
        let tDescription = "test function failure case";
        let tPrice = undefined;

        let productFromFunction = build(tProduct, tDescription, tPrice);

        expect(productFromFunction).toStrictEqual(null);
        
    });

});