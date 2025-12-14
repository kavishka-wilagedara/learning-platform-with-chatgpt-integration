const validateCourseCreateOrUpdate = ({ title, description}) => {
    if(!title || title.trim() === ""){
        return "Title is required"
    }

    if(!description || description.trim() === ""){
        return "Description is required"
    }

    return null
}

module.exports = {
    validateCourseCreateOrUpdate
}

