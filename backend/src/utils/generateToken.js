const jwt = require("jsonwebtoken")

/**
 * Generates a JSON Web Token (JWT) for a given user ID.
 * @param {string} id - The MongoDB ObjectID of the user.
 * @param {string} role - Role of the user.
 * @returns {string} The signed JWT.
 */

const generateToken = (id,role) => {

    const expiresIn = process.env.JWT_EXPIRES_IN || '1h'

    return jwt.sign(
        {id, role},
        process.env.JWT_SECRET_KEY,
        {expiresIn}
    )
}

module.exports = generateToken