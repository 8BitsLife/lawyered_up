import { json } from "./_lib/response.js";

const lawyers = [
  {
    id: 1,
    name: "Aarushi Mehta",
    specialization: "Family Law",
    location: "Mumbai",
    experience: 9,
    rating: 4.9,
    proBono: true
  },
  {
    id: 2,
    name: "Rohan Khanna",
    specialization: "Corporate Law",
    location: "Delhi",
    experience: 12,
    rating: 4.8,
    proBono: false
  },
  {
    id: 3,
    name: "Nisha Rao",
    specialization: "Criminal Defense",
    location: "Bengaluru",
    experience: 7,
    rating: 4.7,
    proBono: false
  }
];

export function GET() {
  return json(lawyers);
}
