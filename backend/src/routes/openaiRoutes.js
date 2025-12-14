const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middlewares/authMiddleware")
const { authorizeRoles } = require("../middlewares/roleMiddleware")
const { getRecommendations } = require("../controllers/openaiController")

router.post(
    "/find",
    verifyToken,
    authorizeRoles('student'),   // Only student can get recommendations
    getRecommendations
);

module.exports = router