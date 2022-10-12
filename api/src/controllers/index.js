const { Videogame } = require('../db.js')
const { traerJuegos, traerJuego } = require('../helper')

const mostrarTodo = async (req, res, next) => {
    try {
        let juegosApi = await traerJuegos();
        let juegos = await Videogame.findAll()
        res.status(200).json(juegos.concat(juegosApi))
    } catch (error) {
        next(error)
    }
}

const mostrarUno = async (req, res, next) => {
    const { id } = req.params
    try {
        let unJuego = await traerJuego(id)
        console.log(unJuego)
        let juego = await Videogame.findByPk(id)
        res.status(200).json(unJuego)
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