const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Videogame", {
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripción: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaDeLanzamiento: {
      type: DataTypes.STRING
    },
    Rating: {
      type: DataTypes.INTEGER
    },
    Plataformas: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  })

};
