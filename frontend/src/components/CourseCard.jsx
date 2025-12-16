import React from 'react'

const CourseCard = ({course, onEnroll}) => {
    return (
        <div className='"border rounded p-4 shadow hover:shadow-lg flex flex-col justify-between"'>
            <div>
                {/* Course name */}
                <h1 className="font-bold text-3xl">{course.title}</h1>

                {/* Description */}
                <h3 className="font-bold text-md text-gray-800 mt-4">
                    About
                </h3>
                <p className="text-gray-500">{course.description}</p>

                {/* Content */}
                <h3 className="font-bold text-md text-gray-800">
                    Content
                </h3>
                <p className="text-gray-500">{course.content}</p>

                {/* Instructor */}
                <h3 className="font-bold text-md">
                    Instructor Details
                </h3>
                <p className="text-gray-500">{course.instructorId.firstname} {course.instructorId.lastname}</p>
            </div>

            {course.enrolled ? (
                <span className="mt-4 px-3 py-1 bg-green-500 text-white rounded text-center">
                    Enrolled
                </span>
            ) : (
                <button
                    onClick={() => onEnroll(course._id)}
                    className="mt-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Enroll
                </button>
      )}
        </div>
    )
}

export default CourseCard