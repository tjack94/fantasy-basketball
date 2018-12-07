module.exports ={
  addPlayer: (req, res) => {
    res.sendStatus(200)
  },
  createUser: (req,res) => {
    const {username, password, email, firstName, lastName} = req.body
    const dbInstance = req.app.get('db')

    dbInstance.create_user([username, password, email, firstName, lastName])
    .then(()=> { res.status(200).send({message: 'item added to database'})})
   .catch((err) => {
    res.status(500).send({ errorMessage: 'Something went wrong!' });
    console.log(err);
 })
  }
}