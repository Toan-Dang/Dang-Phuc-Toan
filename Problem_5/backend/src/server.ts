import app from "./app";


const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
