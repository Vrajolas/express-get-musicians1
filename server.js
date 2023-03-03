const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO
app.get("/musicians", async (res, req) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
})

app.get("/musicians/:id", async (req, res) => {
    const musiciansId = req.params.id;
    const musicians = await Musician.findByPk(musiciansId)
    res.json(musicians);
})

app.post("/musicians", async (req, res) => {
    const newMusician = await Musician.create(req.body);
    res.json(newMusician);
});

app.put("/musicians/:id", async (req, res) => {
    const musicianId = req.params.id;
    const updatedMusician = await Musician.update(req.body, {
        where: {
            id: musicianId
        }
    });
    res.json(updatedMusician);
});

app.delete("/musicians/:id", async (req, res) => {
    const musicianId = req.params.id;
    await Musician.destroy({
        where: {
            id: musicianId
        }
    });
    res.json({ message: "Musician deleted successfully!" });
});

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})