// ---------------------- LIBRARIES ----------------
const express = require('express'); // Импорт библиотеки Express JS
const mongoose = require("mongoose")
const Picture = require("./picture")
const morgan = require('morgan');

const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms')) // пример middlewar 
app.use(express.static("public"))
app.set('view engine', "ejs") // шаблонизатор
app.use(express.urlencoded({ extended: false })) // импорт бодипарсера

const db = "mongodb+srv://drawer:338337@cluster0.ukknj.mongodb.net/Draw_Online?retryWrites=true&w=majority&appName=Cluster0"

// ------------------------------ DATABASE -----------------------------
mongoose 
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log("Connected to DB"))
    .catch((error) => console.log(error))

app.get('/', (req, res) => {
    res.render("index.ejs"); // Отправьте файл index.html
});

app.get('/pictures', (req, res) => {
    const title = "Pictures";
    Picture
        .find()
        .sort({ createdAt: -1})
        .then((pictures) => res.render("pictures", { pictures, title }))
        .catch((error) => {
            console.log(error);
        });
})

app.get('/add-picture', (req, res) => {
    const title = "Pictures";
    res.render("add-picture.ejs")
})

app.post('/add-picture', (req, res) => { // post -- запрос который выполняеться при нажимания кнопки в формах и отправке данных из тел в форме
    const { Name, author, price } = req.body
    const picture = new Picture({ Name, author, price });
    picture
        .save()
        .then((result) => {
            res.send(result)
        })
        .catch((error) => { console.log(error) })

})

const PORT = 3000

// --------------------- SERVER LAUNCHING ----------------------------------------

app.listen(PORT, () => {
    console.log(`server started http://localhost:${PORT}`)
})

// // команда запуска сервера в терминале
// // node index
