const app = require('./app').app;

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});