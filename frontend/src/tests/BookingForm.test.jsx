import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import BookingForm from "../components/BookingForm/BookingForm.jsx";

describe("BookingForm component", () => {
  const services = [
    { id: "signature-haircut", name: "Signature Haircut" },
    { id: "luxury-shave", name: "Luxury Shave" },
  ];

  const barbers = [
    { id: "marcus-johnson", name: "Marcus Johnson" },
    { id: "noah-hardy", name: "Noah Hardy" },
  ];

  it("submits selected options", async () => {
    const handleSubmit = vi.fn().mockResolvedValue(true);
    render(
      <BookingForm
        services={services}
        barbers={barbers}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Your name"), {
      target: { value: "Testing Guest" },
    });
    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "guest@test.com" },
    });
    fireEvent.change(screen.getByLabelText("Service"), {
      target: { value: "luxury-shave" },
    });
    fireEvent.change(screen.getByLabelText("Barber"), {
      target: { value: "noah-hardy" },
    });
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "2025-09-23" },
    });
    fireEvent.change(screen.getByLabelText("Time"), {
      target: { value: "14:30" },
    });

    fireEvent.click(screen.getByRole("button", { name: /book appointment/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      serviceId: "luxury-shave",
      barberId: "noah-hardy",
      date: "2025-09-23",
      time: "14:30",
      clientName: "Testing Guest",
      clientEmail: "guest@test.com",
    });
  });
});
