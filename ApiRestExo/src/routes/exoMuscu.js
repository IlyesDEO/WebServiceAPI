const { Exo } = require('../db/sequelize')
const {exo} = require('../models/exo')
const auth = require('../auth/auth')

module.exports = (app) => {

app.get('/', (req,res) => res.send('Bienvenue sur ma première api en node, symfony ça reste mieux !'))

let cachedData = null;

app.get('/api/exo', auth, async (req, res) => {
  try{
    if (cachedData) {
      const message = 'La liste des exercices a été renvoyée à partir du cache.';
      res.json({ message, data: cachedData });
    } else {
      const exo = await Exo.findAll()
      const message = 'La liste des exercices a bien été récupérée.';
      cachedData = exo;
      res.json({ message, data: exo });
    }
  }catch(e){
    res.status(500).json({ error: 'Une erreur s\'est produite.' });
  }
});

  app.get('/api/exo/:id', auth, (req,res) => {
    Exo.findByPk(req.params.id)
    .then(exo => {
      const message = `L'exercice à bien été trouvé.`
      res.json({message, data: exo})
    })
  })

  app.post('/api/exo', auth, (req, res) => {
    Exo.create(req.body)
      .then(exo => {
        const message = `L'exo ${req.body.name} a bien été crée.`
        res.json({ message, data: exo })
      })
    .catch(error => {
        const message = `L'exercice n'a pas pu être ajouté. Réessayez plus tard`
        res.status(500).json({message, data: error})
    })
  })

  app.put('/api/exo/:id', auth, (req, res) => {
    const id = req.params.id
    Exo.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      Exo.findByPk(id).then(exo => {
        const message = `L'exercice ${exo.name} a bien été modifié.`
        res.json({message, data: exo })
      })
    })
  })

  app.delete('/api/exo/:id', auth, (req, res) => {
    Exo.findByPk(req.params.id).then(exo => {
      const exoDeleted = exo;
      Exo.destroy({
        where: { id: exo.id }
      })
      .then(_ => {
        const message = `L'exo avec l'identifiant n°${exoDeleted.id} a bien été supprimé.`
        res.json({message, data: exoDeleted })
      })
    })
})
}

