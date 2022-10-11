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
        const paginaDos = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=40&page=2`)
            .then(ele => ele.data.results)
        const paginaTres = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=20&page=3`)
            .then(ele => ele.data.results)
        return [...paginaUno, ...paginaDos, ...paginaTres].map(ele => ({
            id: ele.id,
            name: ele.name,
            background_image: ele.background_image,
            genres: ele.genres.map(gene => gene.name)
        }))
    }
}