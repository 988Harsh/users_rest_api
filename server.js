
const { access } = require('./middleware/access')
const app = require('./app')
const port = process.env.PORT || 3000


// app.use(access)
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

