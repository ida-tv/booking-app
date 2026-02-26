"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Booking = {
  id: number;
  client_name: string;
  client_phone: string;
  status: string;
};

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  async function fetchBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("id", { ascending: false });

    if (!error && data) {
      setBookings(data);
    }
  }

  async function updateStatus(id: number, status: string) {
    await supabase.from("bookings").update({ status }).eq("id", id);
    fetchBookings();
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6 font-bold">Админ-панель</h1>

      {bookings.length === 0 && <p>Записей пока нет</p>}

      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="border p-4 mb-4 rounded flex justify-between items-center"
        >
          <div>
            <p><b>Имя:</b> {booking.client_name}</p>
            <p><b>Телефон:</b> {booking.client_phone}</p>
            <p><b>Статус:</b> {booking.status}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => updateStatus(booking.id, "approved")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Подтвердить
            </button>

            <button
              onClick={() => updateStatus(booking.id, "rejected")}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Отклонить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}