"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiClient } from "../../../api/client";
import Link from "next/link";
import { StarRating } from "../components/StarRating";

export default function AddItemPage() {
  const client = new ApiClient()
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
      newItem.assignedUser = assignedUser;
       // eventually implement user assignment
       const data = client.addChore(newItem)
    } else {
      newItem.price = Number(price);
      newItem.pricePerPerson = Number(pricePerPerson);
    }

    alert("New item submitted:\n" + JSON.stringify(newItem, null, 2));

    // Reset form or redirect back to /chores
    router.push("/chores");
  }

  return (
    <>
      <header className="bg-rose-500 text-white p-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-3xl font-extrabold">All Your Chores</Link>
        </div>
      </header>

      <div className="max-w-lg mx-auto p-6 bg-rose-50 rounded-md shadow-md mt-10 text-gray-800">
        <h1 className="text-2xl mb-4 font-semibold">
          Add New {itemType === "chores" ? "Chore" : "Bill"}
        </h1>
 

  {/* Choose type */}
  <div className="mb-6 flex gap-4">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="itemType"
        value="chores"
        checked={itemType === "chores"}
        onChange={() => setItemType("chores")}
        className="text-rose-600 focus:ring-rose-400"
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
        className="text-rose-600 focus:ring-rose-400"
      />
      Bill
    </label>
  </div>

  <form onSubmit={handleSubmit} className="space-y-4">
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
        className="w-full p-2 rounded bg-white border border-gray-300 focus:outline-none focus:border-rose-400"
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
        className="w-full p-2 rounded bg-white border border-gray-300 focus:outline-none focus:border-rose-400"
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
        className="w-full p-2 rounded bg-white border border-gray-300 focus:outline-none focus:border-rose-400"
        rows={3}
      />
    </div>

    {/* Chore-specific fields */}
    {itemType === "chores" && (
      <>
       {/* Star Picker */}
<div>
  <label className="block mb-1 font-medium">
    Difficulty
  </label>
  <StarRating rating={difficulty} onChange={setDifficulty} interactive={true} size={50} />
  <p className="text-sm text-gray-500 mt-1">Click stars to rate difficulty</p>
</div>

        <div>
          <label className="block mb-1 font-medium">Assign User</label>
          <button
            type="button"
            onClick={() => alert("Assign user feature coming soon")}
            className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded hover:bg-emerald-200"
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
            step="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 rounded bg-white border border-gray-300 focus:outline-none focus:border-rose-400"
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
            step="1"
            value={pricePerPerson}
            onChange={(e) => setPricePerPerson(e.target.value)}
            className="w-full p-2 rounded bg-white border border-gray-300 focus:outline-none focus:border-rose-400"
            required
          />
        </div>
      </>
    )}

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full mt-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
    >
      Add {itemType === "chores" ? "Chore" : "Bill"}
    </button>
  </form>
</div>
</>
  );
}