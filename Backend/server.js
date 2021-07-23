require("dotenv").config();
const express = require("express");
const cors=require("cors")

const app = express();




app.use(cors())
app.use(express.json());

app.use("/auth",require("./routes/routerAuth"))
app.use("/asignatura",require("./routes/routerAsignatura"))
app.use("/home",require("./routes/routerHome"))
app.use("/admin",require("./routes/routerAdmin"))
app.use("/mensaje",require("./routes/routerMensaje"))

const port= process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Sv is up in port',port);
});








