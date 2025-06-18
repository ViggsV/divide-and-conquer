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
      completed
        ? "border-emerald-400 bg-emerald-50"
        : "border-rose-300 bg-rose-50"
    }`}
  >
    {/* Title */}
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <button
        onClick={() => alert("Toggle completed - to be implemented")}
        className={`text-sm px-2 py-1 rounded font-medium ${
          completed
            ? "bg-emerald-500 text-white hover:bg-emerald-600"
            : "bg-rose-500 text-white hover:bg-rose-600"
        }`}
      >
        {completed ? "Completed" : "Not Completed"}
      </button>
    </div>

    {/* Due date */}
    {dueDate && (
      <p className="text-sm mb-1 text-emerald-700">
        <strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString()}
      </p>
    )}

    {/* Description */}
    {description && (
      <p className="text-sm mb-2 text-emerald-700">
        <strong>Description:</strong> {description}
      </p>
    )}

    {/* Chore-specific fields */}
    {type === "chores" && (
      <>
        {difficulty !== null && difficulty !== undefined && (
          <p className="text-sm mb-2 text-emerald-700">
            <strong>Difficulty:</strong> {difficulty}/10
          </p>
        )}

        <div className="text-sm text-emerald-700">
          <strong>User:</strong>{" "}
          {assignedUser ? (
            <span>{assignedUser}</span>
          ) : (
            <button
              onClick={() => alert("Assign user - to be implemented")}
              className="text-rose-600 underline hover:text-rose-800"
            >
              Not assigned (click to assign)
            </button>
          )}
        </div>
      </>
    )}

    {/* Bill-specific fields */}
    {type === "bills" && (
      <>
        <p className="text-sm mb-1 text-emerald-700">
          <strong>Price:</strong> £{price.toFixed(2)}
        </p>
        <p className="text-sm text-emerald-700">
          <strong>Price per person:</strong> £{pricePerPerson.toFixed(2)}
        </p>
      </>
    )}
  </div>
);
}