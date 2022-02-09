const router = require('express').Router();

router.get("/", (req, res) => {
    res.render("home");

});
router.get("/about", (req, res) => {
    res.render("about");
    // res.status(200).send('hello world')
});

module.exports = router;