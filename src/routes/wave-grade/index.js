const { Router } = require("express");
const router = Router();
const ctrl = require("./wave-grade.ctrl");

router.get("/", ctrl.get_root);
router.get("/raw-data", ctrl.get_raw_data);

module.exports = router;
