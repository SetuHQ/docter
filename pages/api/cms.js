const structure = require("../../utils/structure");

export default (req, res) => {
    const menuItems = structure.getFrontMatter();
    res.status(200).send(menuItems);
};
