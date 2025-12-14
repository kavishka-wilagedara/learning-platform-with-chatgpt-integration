const validateRegister = ({ firstname, lastname, username, password}) => {
    if (!firstname || firstname.trim() === "") {
        return "First name is required";
    }

    if (!lastname || lastname.trim() === "") {
        return "Last name is required";
    }

    if (!username || username.trim() === "") {
        return "Username is required";
    }

    if (!password || password.trim() === "") {
        return "Password is required";
    }

    if (password.trim().length < 8) {
        return "Password must be at least 8 characters";
    }

    return null;
}

const roleValidate = ({role}) => {
    const allowedRoles = ['student', 'instructor'];
    const assignedRole = allowedRoles.includes(role) ? role: 'student';
    return assignedRole;
}

module.exports = {
  validateRegister,
  roleValidate
}