/**
 * This function produces an unique id for a components.
 * @returns A number as a unique id.
 */
const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export default uid;
