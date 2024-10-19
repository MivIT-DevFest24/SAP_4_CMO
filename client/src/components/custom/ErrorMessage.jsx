import React from "react";

export default function ErrorMessage({ message }) {
  return (
    <span className="text-red-500 text-xs mt-2 text-center mx-auto">
      {message}
    </span>
  );
}
