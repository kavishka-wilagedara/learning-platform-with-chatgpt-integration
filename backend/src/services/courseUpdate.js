/**
 * Apply allowed updates to course document
 *
 * @param {object} document - course document
 * @param {object} newData - req.body
 * @param {string[]} allowedFields - fields allowed to update
 */

const applyCourseUpdates = (document, newData, allowedFields) => {
  allowedFields.forEach((field) => {
      document[field] = newData[field];
  });
};

module.exports = { applyCourseUpdates };
