const express = require("express");
const uuid = require("uuid")
const array = require("./main")
const app = express();
app.use(express.json());


app.get("/api/use", (req, res) => {
    res.send(array)
})
app.get("/api/use/:id", (req, res) => {
    const name = array.find(b => b.id === parseInt(req.params.id))
    if (!name)
        return res.status(404).send("berilgan id odam topilmadi...")
    res.send(name)
});
app.post("/api/use", (req, res) => {
    const soket = {
        id: uuid.v4(),
        name: req.body.name,
        age: req.body.age
    }
    if (!req.body.name && req.body.age) {
        res.status(405).send({ mesage: "Bula yaxshilab tekshirib kiriting iltimos.." })
    }
    set = array.push(soket)
    res.status(201).send(soket)
});
app.put("/api/use/:id", (req, res) => {
    const name = array.find(b => b.id === parseInt(req.params.id))
    if (name) {
        const updatemen = req.body
        array.forEach(men => {
            if (men.id === parseInt(req.params.id)) {
                men.name = updatemen.name ? updatemen.name : men.name,
                    men.age = updatemen.age ? updatemen.age : men.age
            }
            res.send({ mesage: "berilgan mame uzgartirildi...", men })
        })
    }
    else {
        res.status(504).send("bunday bolishi mumkiin emas...")
        res.send(name)
    }
});
app.delete("/api/use/:id", async (req, res) => {
    const name = array.find(b => b.id === parseInt(req.params.id))
    if (!name)
        return res.status(404).send("berilgan id odam topilmadi...")

    const summ = array.indexOf(name)
    array.splice(summ, 2)
    res.send(name)
});

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("port is ranning", PORT, "...")
});