const { Videogame, Genero } = require('../db.js')
const { traerJuegos, traerJuego } = require('../helper')

const mostrarTodo = async (req, res, next) => {
    try {
        let juegosApi = await traerJuegos();
        let juegos = await Videogame.findAll({
            include: [{ model: Genero, attributes: ['nombre'], through: { attributes: [] } }]
        })
        res.status(200).json(juegos.concat(juegosApi))
    } catch (error) {
        next(error)
    }
}

const mostrarUno = async (req, res, next) => {
    const { id } = req.params
    try {
        if (String(Number(id)) === "NaN") {
            let juego = await Videogame.findOne({
                where: { id: id },
                include: Genero
            })
            res.status(200).json(juego)
        } else {
            let unJuego = await traerJuego(id)
            res.status(200).json(unJuego)
        }
    } catch (error) {
        next(error)
    }
}

const crearUno = async (req, res, next) => {
    const { name, background_image, platforms, genres, rating, released, description_raw } = req.body
    try {
        const newProject = await Videogame.create({
            name,
            background_image,
            platforms,
            rating,
            released,
            description_raw
        })
        const allGenres = await Genero.findAll({ where: { nombre: genres } })
        newProject.addGenero(allGenres)
        res.status(201).json(`Usuario ${newProject.dataValues.name} creado`)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    mostrarTodo,
    mostrarUno,
    crearUno
}