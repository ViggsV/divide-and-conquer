"use client";

import React from "react";

export default function ItemCard({
  id,
  type,
  title,
  completed,
  dueDate,
  description,
  difficulty,
  assignedUser,
  price,
  pricePerPerson,
}) {
  return (
    <div
      className={`p-4 rounded-md shadow-md border ${
        completed ? "border-green-500 bg-green-900" : "border-gray-700 bg-gray-900"
      }`}
    >
      {/* Title */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold  text-gray-300">{title}</h3>
        <button
          // For now, just a placeholder for toggling completed
          onClick={() => alert("Toggle completed - to be implemented")}
          className={`text-sm px-2 py-1 rounded ${
            completed ? "bg-green-600" : "bg-gray-600"
          }`}
        >
          {completed ? "Completed" : "Not Completed"}
        </button>
      </div>

      {/* Due date */}
      {dueDate && (
        <p className="text-sm mb-1 text-blue-200">
          <strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString()}
        </p>
      )}

      {/* Description */}
      {description && (
        <p className="text-sm mb-2 text-gray-300">
          <strong>Description:</strong> {description}
        </p>
      )}

      {type === "chores" && (
        <>
          {/* Difficulty */}
          {difficulty !== null && difficulty !== undefined && (
            <p className="text-sm mb-2 text-blue-200">
              <strong>Difficulty:</strong> {difficulty}/10
            </p>
          )}

          {/* Assigned User */}
          <div className="text-sm  text-blue-200" >
            <strong>User:</strong>{" "}
            {assignedUser ? (
              <span>{assignedUser}</span>
            ) : (
              <button
                onClick={() => alert("Assign user - to be implemented")}
                className="text-blue-400 underline hover:text-blue-600"
              >
                Not assigned (click to assign)
              </button>
            )}
          </div>
        </>
      )}

      {type === "bills" && (
        <>
          {/* Price */}
          <p className="text-sm mb-1">
            <strong>Price:</strong> £{price.toFixed(2)}
          </p>

          {/* Price Per Person */}
          <p className="text-sm">
            <strong>Price per person:</strong> £{pricePerPerson.toFixed(2)}
          </p>
        </>
      )}
    </div>
  );
}
