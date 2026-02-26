"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.from("bookings").insert([
      {
        client_name: name,
        client_phone: phone,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Вы записаны!");
      setName("");
      setPhone("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Онлайн-запись
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Ваше имя"
            className="w-full border p-3 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Ваш телефон"
            className="w-full border p-3 rounded-lg"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            Записаться
          </button>
        </form>
      </div>
    </div>
  );
}