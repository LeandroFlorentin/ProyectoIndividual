const { Genero } = require('../db.js')
const { traerGeneros } = require('../helper')

const mostrarGeneros = async (req, res, next) => {
    try {
        const genero = await Genero.findAll()
        if (!genero.length) {
            let arrayGenero = await traerGeneros()
            const arrayNuevo = await Genero.bulkCreate(arrayGenero)
            res.send(arrayNuevo)
        }
        else {
            res.send(genero)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = mostrarGeneros;