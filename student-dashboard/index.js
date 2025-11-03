const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('🎓 Student Dashboard App is Running Successfully!');
});

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
