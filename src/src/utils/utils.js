import React, { Component }  from 'react';

/**
 * This function creates a short unique ID from strings.
 * @returns A short unique ID from strings.
 */
export function shortId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

export function randomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 95%, 90%)`;
}
