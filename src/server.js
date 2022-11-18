const app = require("./app.js");
const port = 3000;

const server = app.listen(port, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Server is working : PORT - ',port);
});
