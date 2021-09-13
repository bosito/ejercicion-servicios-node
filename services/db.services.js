import fs from "fs/promises";
import path from "path";
import faker from "faker";

class AcademloDb {

    static dbPath = path.resolve("db", "db.json");

    static findAll = async () => {
        try {

            const data = await fs.readFile(this.dbPath, "utf8");
            return JSON.parse(data);

        } catch (error) {
            throw new Error("Hubo un error al tratar de obtener todos los registros de la DB");
        }
    }

    static findById = async (id) => {
        try {

            const data = await this.findAll();

            return data.find((dataUser) => dataUser.id === parseInt(id));

        } catch (error) {

            throw new Error("No se pudo obtener la lista de la db");

        };
    };

    static create = async (obj) => {
        try {
            const data = await this.findAll();

            const nextId = (data.length + 1);

            const newObj = obj;
            newObj.id = nextId;

            data.push(newObj);

            await fs.writeFile(this.dbPath, JSON.stringify(data));

            return newObj;

        } catch (error) {
            throw new Error("Error al crear nuevo usuario");
        };
    };

    static update = async (obj, id) => {
        try {

            const data = await this.findAll();
            const arrayData = [...data];

            const indexUser = arrayData.findIndex(item => item.id === id)

            if (indexUser === -1) {
                throw new Error("No existe ie id en DB");
            }

            arrayData.splice(indexUser, 1, obj);

            await fs.writeFile(this.dbPath, JSON.stringify(arrayData));

            return arrayData[indexUser];

        } catch (error) {

            throw new Error("Error al actualizar el usuario");

        }
    }

    static delete = async id => {
        try {
            const data = await this.findAll();
            const arrayData = [...data];
            let indexUser;

            arrayData.forEach((element, index) => {
                if (element.id === id) {
                    indexUser = index
                }
            });

            if (indexUser === undefined) {
                return false;
            };

            arrayData.splice(indexUser, 1);

            await fs.writeFile(this.dbPath, JSON.stringify(arrayData));

            return true

        } catch (error) {

            throw new Error("Error al eliminar el usuario");

        }
    };

    static clear = async () => {
        try {
            await fs.writeFile(this.dbPath, JSON.stringify([]));
        } catch (error) {
            throw new Error("Hubo un error al tratar de vaciar la DB");
        }
    }

    //agrega datos aleatorios a bd
    static populateDB = async (size) => {
        const userArr = [];

        for (let i = 0; i < size; i++) {
            const userObj = {
                id: i + 1,
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: faker.internet.email().toLowerCase()
            };

            userArr.push(userObj);
        };

        try {

            await fs.writeFile(this.dbPath, JSON.stringify(userArr));

            return userArr;

        } catch (error) {

            throw new Error("Hubo un error al insertar en la base de datos");

        }
    }

}

export default AcademloDb;