const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const Exo = require("./src/models/exo");
const mongoose = require('mongoose');

// Fonctions de résolution GraphQL
const resolvers = {
  exo: async ({ id }) => {
    try {
      const exo = await Exo.findById(id);
      return exo ? { ...exo._doc, _id: exo.id } : null;
    } catch (error) {
      throw error;
    }
  },

  exos: async () => {
    try {
      const exosFetched = await Exo.find();
      return exosFetched.map(exo => ({
        ...exo._doc,
        _id: exo.id,
      }));
    } catch (error) {
      throw error;
    }
  },

  createExo: async args => {
    try {
      const { name, intensity } = args;
      const exo = new Exo({
        name,
        intensity,
      });
      const newExo = await exo.save();
      return { ...newExo._doc, _id: newExo.id };
    } catch (error) {
      throw error;
    }
  },
  updateExo: async ({ id, name, intensity }) => {
    try {
      const updatedExo = await Exo.findByIdAndUpdate(
        id,
        { name, intensity },
        { new: true } // Retourne le document modifié
      );

      return updatedExo ? { ...updatedExo._doc, _id: updatedExo.id } : null;
    } catch (error) {
      throw error;
    }
  },
  deleteExo: async ({ id }) => {
    try {
      const deletedExo = await Exo.findByIdAndDelete(id);
      return deletedExo ? { ...deletedExo._doc, _id: deletedExo.id } : null;
    } catch (error) {
      throw error;
    }
  },
};

// Schéma GraphQL
const schema = buildSchema(`
  type Query {
    exo(id: ID!): Muscu
    exos: [Muscu]
  }

  type Mutation {
    createExo(name: String!, intensity: String!): Muscu
    updateExo(id: ID!, name: String, intensity: String): Muscu
    deleteExo(id: ID!): Muscu
  }

  type Muscu {
    _id: ID!
    name: String
    intensity: String
  }
`);

// Création du serveur Express
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

const uri = `mongodb+srv://ilyes:root@atlascluster.0c3nq2p.mongodb.net/atlascluster?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(uri, options)
  .then(() => {
    app.listen(4000, () => {
      console.log('Serveur GraphQL lancé sur http://localhost:4000/graphql');
    });
  })
  .catch((error) => {
    console.error('Erreur de connexion à MongoDB :', error.message);
  });
