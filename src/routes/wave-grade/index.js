const { Router } = require("express");
const router = Router();
const ctrl = require("./wave-grade.ctrl");

router.get("/", ctrl.get_wave_info_total_data);
router.get("/raw-data", ctrl.get_raw_data);
router.get("/test", ctrl.get_root);

module.exports = router;
