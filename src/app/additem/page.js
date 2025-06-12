"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddItemPage() {
  const router = useRouter();

  const [itemType, setItemType] = useState("chores"); 

  // Common fields
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  // Chore-specific
  const [difficulty, setDifficulty] = useState(1);
  const [assignedUser, setAssignedUser] = useState(null);

  // Bill-specific
  const [price, setPrice] = useState("");
  const [pricePerPerson, setPricePerPerson] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Basic validation for required fields - can expand this later
    if (!title.trim()) {
      alert("Title is required.");
      return;
    }
    if (itemType === "bills" && !dueDate) {
      alert("Due date is required for bills.");
      return;
    }
    if (itemType === "bills") {
      if (!price || isNaN(price) || Number(price) <= 0) {
        alert("Valid price is required.");
        return;
      }
      if (!pricePerPerson || isNaN(pricePerPerson) || Number(pricePerPerson) <= 0) {
        alert("Valid price per person is required.");
        return;
      }
    }

    // The Item Object
    const newItem = {
      id: Date.now(),
      type: itemType,
      title,
      dueDate: dueDate || null,
      description: description.trim() || null,
      completed: false, 
      pageId: 1, // For now using 1 until we implement page selection
    };

    if (itemType === "chores") {
      newItem.difficulty = difficulty;
      newItem.assignedUser = assignedUser; // eventually implement user assignment
    } else {
      newItem.price = Number(price);
      newItem.pricePerPerson = Number(pricePerPerson);
    }

    alert("New item submitted:\n" + JSON.stringify(newItem, null, 2));

    // Reset form or redirect back to /chores
    router.push("/chores");
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-900 rounded-md shadow-md mt-10 text-white">
      <h1 className="text-2xl mb-4 font-semibold">Add New {itemType === "chores" ? "Chore" : "Bill"}</h1>

      {/* Choose type */}
      <div className="mb-6 flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="itemType"
            value="chores"
            checked={itemType === "chores"}
            onChange={() => setItemType("chores")}
            className="cursor-pointer"
          />
          Chore
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="itemType"
            value="bills"
            checked={itemType === "bills"}
            onChange={() => setItemType("bills")}
            className="cursor-pointer"
          />
          Bill
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-gray-200">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="dueDate" className="block mb-1 font-medium">
            Due Date {itemType === "bills" && <span className="text-red-500">*</span>}
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            required={itemType === "bills"}
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            rows={3}
          />
        </div>

        {/* Chore-specific fields */}
        {itemType === "chores" && (
          <>
            <div>
              <label htmlFor="difficulty" className="block mb-1 font-medium">
                Difficulty (out of 10)
              </label>
              <input
                id="difficulty"
                type="number"
                min={1}
                max={10}
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Assign User</label>
              <button
                type="button"
                onClick={() => alert("Assign user feature coming soon")}
                className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
              >
                {assignedUser || "Not assigned (click to assign)"}
              </button>
            </div>
          </>
        )}

        {/* Bill-specific fields */}
        {itemType === "bills" && (
          <>
            <div>
              <label htmlFor="price" className="block mb-1 font-medium">
                Price (£) <span className="text-red-500">*</span>
              </label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="pricePerPerson" className="block mb-1 font-medium">
                Price Per Person (£) <span className="text-red-500">*</span>
              </label>
              <input
                id="pricePerPerson"
                type="number"
                min="0"
                step="0.01"
                value={pricePerPerson}
                onChange={(e) => setPricePerPerson(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Add {itemType === "chores" ? "Chore" : "Bill"}
        </button>
      </form>
    </div>
  );
