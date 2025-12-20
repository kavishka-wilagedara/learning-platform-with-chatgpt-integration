import React from 'react'

const CourseCard = ({course, onEnroll}) => {
    return (
        <div className="group bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="space-y-4">
                {/* Course name */}
                <h1 className="text-2xl font-extrabold text-gray-800">
                    {course.title}
                </h1>

                {/* Description */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase">
                        About
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                        {course.description}
                    </p>
                </div>

                {/* Content */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase">
                        Content
                    </h3>
                    <p className="text-gray-6About00 text-sm mt-1">
                        {course.content}
                    </p>
                </div>

                {/* Instructor */}
                <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                        Instructor
                    </p>
                    <p className="font-semibold text-gray-800">
                        {course.instructorId.firstname} {course.instructorId.lastname}
                    </p>
                </div>
            </div>

            {course.enrolled ? (
                <span className="mt-6 inline-block text-center px-4 py-2 rounded-lg bg-green-100 text-green-700 font-semibold">
                    ✓ Enrolled
                </span>
            ) : (
                <button
                    onClick={() => onEnroll(course._id)}
                    className="mt-4 w-full px-4 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-700"
                >
                    Enroll Now
                </button>
      )}
        </div>
    )
}

export default CourseCard