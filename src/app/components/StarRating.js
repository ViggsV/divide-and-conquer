import React, { useState, useEffect, useRef } from "react";

function Star({ filled, half, size, onMouseMove, onClick, onMouseLeave, interactive }) {
  const starStyle = {
    width: size,
    height: size,
    cursor: interactive ? "pointer" : "default",
    transition: "transform 0.2s ease, color 0.2s ease",
  };

  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      style={starStyle}
      onMouseMove={onMouseMove}
      onClick={onClick}
      onMouseLeave={onMouseLeave}
      className={`text-yellow-400 ${interactive ? "hover:scale-110" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="half-grad">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {filled ? (
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
      ) : half ? (
        <path fill="url(#half-grad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
      ) : (
        <path
          className="text-gray-300"
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z"
        />
      )}
    </svg>
  );
}

// Star rating component allowing users to rate from 0.5 to 5 stars, with hover animations.
export function StarRating({ rating = 0, onChange, interactive = false, size = 20 }) {
  const [hoverRating, setHoverRating] = useState(0);
  const containerRef = useRef(null);

  const displayRating = hoverRating || rating;

  const handleMouseMove = (event, index) => {
    if (!interactive) return;
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX;
    const isHalf = mouseX - left < width / 2;
    const newHoverRating = isHalf ? index - 0.5 : index;
    setHoverRating(newHoverRating);
  };

  const handleClick = (index) => {
    if (!interactive || !onChange) return;
    onChange(hoverRating || index);
  };
  
  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(0);
  };

  // Stars array
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = displayRating >= i;
    const half = displayRating >= i - 0.5 && displayRating < i;

    stars.push(
      <Star
        key={i}
        size={size}
        filled={filled}
        half={half}
        interactive={interactive}
        onMouseMove={(e) => handleMouseMove(e, i)}
        onClick={() => handleClick(i)}
        onMouseLeave={handleMouseLeave}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex gap-1 select-none"
      onMouseLeave={handleMouseLeave}
      aria-label={`Star rating: ${rating} out of 5`}
      role={interactive ? "slider" : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {stars}
    </div>
  );
}
