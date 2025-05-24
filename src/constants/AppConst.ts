export const authRole = {
  Admin: ["admin"],
  User: ["user", "admin"],
};

// export const defaultUser = {
//   uid: "john-alex",
//   displayName: "John Alex",
//   email: "demo@example.com",
//   token: "access-token",
//   role: "user",
//   photoURL: "/assets/images/A11.jpg",
// };
export const allowMultiLanguage = import.meta.env.VITE__MULTILINGUAL === "true";
export const initialUrl = import.meta.env.VITE__INITIAL_URL as string; // this url will open after login
