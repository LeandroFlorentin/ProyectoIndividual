const axios = require('axios')

const apiKey = "c0742e42dc724c8a8427a780c595c65b";

module.exports = {
    traerGeneros: async () => {
        return await axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`)
            .then(datos => datos.data.results.map(dato => ({ nombre: dato.name })))
    },
    traerJuegos: async () => {
        const paginaUno = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=40`)
            .then(ele => ele.data.results)
        const paginaDos = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=40&page=3`)
            .then(ele => ele.data.results)
        const paginaTres = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=20&page=4`)
            .then(ele => ele.data.results)
        return [...paginaUno, ...paginaDos, ...paginaTres].map(ele => ({
            id: ele.id,
            name: ele.name,
            background_image: ele.background_image,
            genres: ele.genres.map(gene => gene.name),
            rating: ele.rating,
        }))
    },
    traerJuego: async (id) => {
        const juego = await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
        let arrayObj = [juego.data].map(ele => ({
            id: ele.id,
            name: ele.name,
            background_image: ele.background_image,
            genres: ele.genres.map(gen => gen.name),
            description_raw: ele.description_raw,
            released: ele.released,
            rating: ele.rating,
            platforms: ele.platforms.map(plat => plat.platform.name)
        }))
        return arrayObj[0]
    }
}

//imagen, genero, descripcion, feha lanza, rating, plataformas.