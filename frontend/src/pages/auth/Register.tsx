// Register.tsx
import React, { useState } from "react";
import { registerUser } from "../../services/api/user";
import User from "../../types/User";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      password !== confirmPassword ||
      !firstName ||
      !lastName ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      alert("Passwords do not match or one of the fields is empty");
      return;
    }

    const user: User = { firstName, lastName, username, password };
    const registeredUser = await registerUser(user);
    console.log("Registered User: ", registeredUser);
    console.log("Route to dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
