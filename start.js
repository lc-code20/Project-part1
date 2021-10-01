const app = require('./app').app;

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});