import supertest from "supertest";
import app from "../../app.js";
import faker from 'faker'
import AcademloDb from "../../services/db.services.js";

describe("Obtener ususarios", () => {
    let newUser = {};
    let id = 0;
    //Antes de la pruebas
    beforeAll(async () => {
        //1.- Voy a crear un usuario con datos "fake"
        newUser = {
            frisname: faker.name.firstName(),
            lastname: faker.name.lastName(),
            email: faker.internet.email(),
        };
        //2.- Insertar el usuario en la db
        const userCreate = await AcademloDb.create(newUser);
        //3.- Voy a guardar el id del usuario que acabo de crear
        id = userCreate.id;

    });

    it("Deberia de obtener un arrglo", async () => {
        const response = await supertest(app).get("/api/v1/users");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
    });

    //Despues dela prueba 
    afterAll(async () => {
        //1.- Borrar el usuario que agrege antes de la prueba
    });

    it("Deberia de obtener los datos del usuario que acabo de insertar en la bace de datos", async () => {
        //4.- Realizar la solicitud de users/:id -> con el id que acabas de crear
        const response = await supertest(app).get(`/api/v1/users/${id}`);
        //5.- Voy a comprobar que los datos que me regresa la solicitud con los mismos que el de users
        expect(response.body).toMatchObject(newUser);
    });

    //hooks de pruebas 
    //BeforeEach -> Antes de cada prueba
    //BeforeAll -> Antes de todas las pruebas
    //AfterEach -> Despues de cada prueba
    //AfterAll -> Despues de todas las pruebas
});