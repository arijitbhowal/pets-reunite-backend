const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


require("./db/conn");
const port = process.env.PORT || 5000;

const Pet = require("./models/pet.model");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/pets", async (req, res) => {
  try {
    let pet = new Pet();
    pet.petStatus = req.body.petStatus;
    pet.type = req.body.type;
    pet.sex = req.body.sex;
    pet.petName = req.body.petName;
    pet.lastSeenAdd = req.body.lastSeenAdd;
    pet.email = req.body.email;
    pet.lastSeenDate = req.body.lastSeenDate;
    pet.description = req.body.description;
    pet.reportImage = req.body.reportImage;
    pet.latitude = req.body.latitude;
    pet.longitude = req.body.longitude;
    pet.userName = req.body.userName;
    pet.userId = req.body.userId;
    pet.timestamp = req.body.timestamp;

    const doc = await pet.save();
    console.log(doc);
    res.json(doc);
  } catch (error) {

    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/pets/maps", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.json(err);
  }
});

app.get("/api/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    let filteredPets = pets;
    const { petStatus, type, sex } = req.query;

    if (petStatus) {
      filteredPets = filteredPets.filter((pet) => pet.petStatus === petStatus);
    }

    if (type) {
      filteredPets = filteredPets.filter((pet) => pet.type === type);
    }

    if (sex) {
      filteredPets = filteredPets.filter((pet) => pet.sex === sex);
    }
    
    
    res.json(filteredPets);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.get('/api/pets/:id', async (req, res) => {
  try {
    const petId = req.params.id;
    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

  
    const response = {
      pet,
      userId: pet.userId
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.put("/api/pets/:petId", async (req, res) => {
  try {
    const petId = req.params.petId;

    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const userId = req.body.userId;

    console.log(userId);


  

    pet.petName = req.body.petName || pet.petName;
    pet.description = req.body.description || pet.description;
    pet.lastSeenAdd=req.body.lastSeenAdd||pet.lastSeenAdd;
    const updatedPet = await pet.save();

    res.json(updatedPet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/pets/:id", async (req, res) => {
  try {
    const petId = req.params.id;
    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const userId = req.body.userId;

    if (userId && userId === pet.userId) {
      await Pet.findByIdAndDelete(petId);
      res.json({ message: 'Pet deleted successfully' });
    } else {
      res.status(403).json({ error: 'Permission denied: You can only delete your own pets' });
    }
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

