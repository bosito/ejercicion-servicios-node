import db from '../services/db.services.js';

export const getUsers = async(requets, response, next) => {
    try {
        const users = await db.findAll();

        response.json(users)

    } catch (error) {
        next(error);
    }
};

export const getUserById = async(request, response, next) => {
    try {
        const { id } = request.params;
        const user = await db.findById(id);

        response.json(user);

    } catch (error) {
        next(error)
    }
}

