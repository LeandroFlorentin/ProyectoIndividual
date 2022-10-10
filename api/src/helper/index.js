const axios = require('axios')

module.exports = {
    traerGeneros: async () => {
        const apiKey = "c0742e42dc724c8a8427a780c595c65b";
        return await axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`)
            .then(datos => datos.data.results.map(dato => ({ nombre: dato.name })))
    }
}