const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const dbRoute = "mongodb://127.0.0.1:27017/ambrosia";
const API_PORT = 3001;
const app = express();
const router = express.Router();

const recipeController = require("./controllers/recipeController");

mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(logger("dev"));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api", router);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
app.set('view engine', 'ejs');

router.get("/", (req, res) => {
    return res.json({ "success": true });
})

router.post("/findrecipe", recipeController.getRecipe);
router.get("/randomrecipe", recipeController.getRandomRecipes);
router.get("/recipe/:name", recipeController.getRecipeByName);
