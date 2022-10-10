const { Videogame } = require('../db.js')

const mostrarTodo = async (req, res, next) => {
    const array = req.body
    try {
        let juegos = await Videogame.findAll()
        res.status(200).json(juegos)
    } catch (error) {
        next(error)
    }
}

const mostrarUno = async (req, res, next) => {
    const { id } = req.params
    try {
        let juego = await Videogame.findByPk(id)
        res.status(200).json(juego)
    } catch (error) {
        next(error)
    }
}

const crearUno = async (req, res, next) => {
    const { Nombre, Descripción, FechaDeLanzamiento, Rating, Plataformas } = req.body
    try {
        const newProject = await Videogame.create({
            Nombre,
            Descripción,
            FechaDeLanzamiento,
            Rating,
            Plataformas
        })
        res.status(201).json(`Usuario ${newProject.dataValues.Nombre} creado`)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    mostrarTodo,
    mostrarUno,
    crearUno
}