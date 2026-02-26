"use client";

import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");

  function handleLogin() {
    document.cookie = `admin=${password}; path=/`;
    window.location.href = "/admin";
  }

  return (
    <div style={{padding: 50}}>
      <h1>Вход в админку</h1>

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleLogin}>
        Войти
      </button>
    </div>
  );
}