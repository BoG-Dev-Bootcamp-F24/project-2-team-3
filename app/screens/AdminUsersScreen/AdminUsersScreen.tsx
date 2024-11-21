"use client";
import React, { useEffect, useState } from "react";
import styles from "../AdminScreens.module.css";

interface User {
  _id: string;
  fullName: string;
  email: string;
  admin: boolean;
}

export default function AdminUsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className={styles.loading}>Loading users...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.adminScreen}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Users</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search users..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {filteredUsers.map((user) => (
          <div key={user._id} className={styles.card}>
            <h3>{user.fullName}</h3>
            <p>{user.email}</p>
            <p>Role: {user.admin ? "Admin" : "User"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
