require("dotenv").config();
const path = require("path");

//express
const express = require("express");
const app = express();

//Routers
const jobsRoutes = require("./routes/jobsRoutes");
const authRoutes = require("./routes/authRoutes");
const jobsAppliedRoutes = require("./routes/jobsAppliedRoutes");
const offerRoutes = require("./routes/offerRoute");
const userRoutes = require("./routes/userRoutes");
const aboutMeRoutes = require("./routes/aboutMeRoutes");
const documentRoutes = require("./routes/documentRoutes");
const educationRoutes = require("./routes/educationRoutes");
const projectsRoutes = require("./routes/projectsRoutes");
const workExperienceRoutes = require("./routes/workExperienceRoutes");

//packages
const fileUpload = require("express-fileupload");

//database
const connectDB = require("./dbConfig/connect");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const notFoundMiddleware = require("./middlewares/notFound");

app.use(express.json());
//serving static file
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(fileUpload());

//Routes
app.use("/api/v1/jobs", jobsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobsAppliedRoutes);
app.use("/api/v1/offer", offerRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/aboutMe", aboutMeRoutes);
app.use("/api/v1/document", documentRoutes);
app.use("/api/v1/education", educationRoutes);
app.use("/api/v1/projects", projectsRoutes);
app.use("/api/v1/workExperience", workExperienceRoutes);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
