const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/authRoutes");
const habitRoutes = require("./routes/habitRoutes");
// middlewares
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

// conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado 🔥"))
  .catch((err) => console.log("Error MongoDB:", err));

// ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

const User = require("./models/User");

app.get("/test-user", async (req, res) => {
  try {
    const user = await User.create({
      email: "test@test.com",
      password: "123456",
    });

    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

const authMiddleware = require("./middleware/authMiddleware");

app.get("/private", authMiddleware, (req, res) => {
  res.json({
    message: "Ruta protegida",
    userId: req.userId,
  });
});

app.use("/habits", habitRoutes);

const habitLogRoutes = require("./routes/habitLogRoutes");

app.use("/habits", habitLogRoutes);