const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://fabianomgadenz:fabianomgadenz@cluster0-dsxky.mongodb.net/test1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require("./controllers/AuthController")(app);
require("./controllers/AreasController")(app);
require("./controllers/UsersController")(app);
require("./controllers/GrandeAreaController")(app);
require("./controllers/SubAreaController")(app);
require("./controllers/TipoAtividadeController")(app);

app.listen(3333);