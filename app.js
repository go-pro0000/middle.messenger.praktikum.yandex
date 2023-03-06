const express = require('express');
const PORT = process.env.PORT || 3000;
 
const app = express();
app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/dist/index.html")
});
 
app.listen(PORT, () => {
  console.log(`Мой текст в логе после запуска ${PORT}!`);
});
