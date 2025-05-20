import useLocalStorage from "./useLocalStorage"; // Assuming useLocalStorage.ts is in the same directory

/**
 * A custom hook to manage a boolean toggle state, persisted in localStorage.
 *
 * @param key The key under which the value is stored in localStorage.
 * @param initialValue The initial boolean value if no value is found in localStorage.
 * @returns A tuple containing the current boolean value and a function to toggle it.
 */
const useToggle = (
  key: string,
  initialValue: boolean
): [boolean, () => void] => {
  // useLocalStorage is now generic, so we specify boolean as the type
  const [value, setValue] = useLocalStorage<boolean>(key, initialValue);

  const toggle = () => {
    setValue((prev) => !prev);
  };

  return [value, toggle];
};

export default useToggle;
