const structure = require("./structure");
var path = require("path");
var fs = require("fs");

const menuItems = structure.getFrontMatter();
fs.writeFile(path.join(__dirname, "menuItems.json"), JSON.stringify(menuItems), (err) => {
    if (err) {
        console.log("Menu Items not saved");
        return;
    } else {
        console.log("Menu Items saved");
    }
});
