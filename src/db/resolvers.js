const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: ".env" });

const crearToken = (user, secret, expiresIn) => {
  //console.log(user);
  const { id, email, nombre } = user;

  return jwt.sign({ id, email, nombre }, secret, { expiresIn });
};

const resolvers = {
  Query: {
    obtenerUsuarios: () => "hello world!",
  },
  Mutation: {
    nuevoUsuario: async (_, { input }) => {
      //console.log(input);
      const { email, password } = input;
      const existeUsuario = await Usuario.findOne({ email });
      if (existeUsuario) {
        throw new Error("Usuario ya Existe!");
      }
      const salt = bcryptjs.genSaltSync(10);
      input.password = bcryptjs.hashSync(password, salt);

      try {
        const usuario = new Usuario(input);
        usuario.save();
        return usuario;
      } catch (error) {
        console.log(error);
      }
    },
    validarUsuario: async (_, { input }) => {
      //console.log(input);
      const { email, password } = input;
      const existeUsuario = await Usuario.findOne({ email });
      if (!existeUsuario) {
        throw new Error("Usuario NO Existe!");
      }
      const passcorrecto = await bcryptjs.compareSync(
        password,
        existeUsuario.password
      );
      if (!passcorrecto) {
        throw new Error("Clave incorrecta!");
      }
      return {
        token: crearToken(existeUsuario, process.env.TOKENWORD, "24h"),
      };
    },
  },
};

module.exports = resolvers;
