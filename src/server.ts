import express from "express";

const app = express();

app.get("/users", (request, response) => {
  console.log("Listagem de usuários");

  response.json(["pedro", "pedro", "pedro", "pedro"]);
});

app.listen(3333);
