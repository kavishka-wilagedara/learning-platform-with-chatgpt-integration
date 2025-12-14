const validateCourseCreateOrUpdate = (data, isUpdate = false) => {
 if (!isUpdate) {
    if (!data.title || data.title.trim() === "") 
        return "Title is required";
    if (!data.description || data.description.trim() === "") 
        return "Description is required";
  } 
  
  else {
    if (data.title !== undefined && data.title.trim() === "") 
        return "Title cannot be empty";
    if (data.description !== undefined && data.description.trim() === "") 
        return "Description cannot be empty";
  }

  return null;
};

module.exports = {
    validateCourseCreateOrUpdate
}

