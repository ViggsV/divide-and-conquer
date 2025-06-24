"use client";

import React from "react";
import { StarRating } from "./StarRating";

export default function ItemCard({
  _id,
  type,
  title,
  completed,
  dueDate,
  description,
  difficulty,
  assignedUser,
  price,
  pricePerPerson,
  onToggleCompleted
}) {
  const themeColor = completed ? "emerald" : "rose";

  return (
    <div
      className={`p-6 rounded-lg shadow-md border border-${themeColor}-400 bg-${themeColor}-50 min-h-[240px] flex flex-col`}
    >
      {/* Status Badges */}
      <div
        className={`flex justify-between items-center mb-4 border-b border-${themeColor}-400 pb-2`}
      >
        {/* Assigned User Badge */}
        {assignedUser ? (
          <span className="text-base font-medium text-gray-700">
            <strong>User:</strong> {assignedUser}
          </span>
        ) : (
          <button
            onClick={() => alert("Assign user - to be implemented")}
            className={`text-sm px-2 py-1 rounded font-medium bg-${themeColor}-500 text-white hover:bg-${themeColor}-600 transition`}
          >
            User Unassigned
          </button>
        )}

        {/* Completed Status Badge */}
        <button
          onClick={() => onToggleCompleted(_id, !completed)}
          className={`text-sm px-2 py-1 rounded font-medium bg-${themeColor}-500 text-white hover:bg-${themeColor}-600 transition`}
        >
          {completed ? "Completed" : "Not Completed"}
        </button>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {title}
      </h3>

      {/* Description */}
      <div className="flex-grow mb-4">
        {description && (
          <div>
            <p className="text-base text-gray-700">{description}</p>
          </div>
        )}

        {/* Bills-specific Fields */}
        {type === "bills" && (
          <div className="mt-3 text-base text-gray-700">
            <p>
              <strong>Price:</strong> £{price.toFixed(2)}
            </p>
            <p>
              <strong>Price per person:</strong> £{pricePerPerson.toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {/* Difficulty + Due Date */}
      {(difficulty !== null || dueDate) && (
        <div
          className={`flex justify-between items-center text-base text-gray-700 pt-3 border-t border-${themeColor}-400 mt-auto`}
        >
          {difficulty !== null && difficulty !== undefined ? (
            <div className="flex items-center gap-2">
              <strong>Difficulty:</strong>
              <StarRating rating={difficulty} interactive={false} size={25} />
            </div>
          ) : (
            <span />
          )}
          {dueDate && (
            <span>
              <strong>Due Date:</strong>{" "}
              {new Date(dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
