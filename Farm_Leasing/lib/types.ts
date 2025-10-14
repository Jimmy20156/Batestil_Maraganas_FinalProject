// User roles in the system
export type UserRole = "farmer" | "owner" | "admin"

// User type
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  phone?: string
  location?: string
  createdAt: Date
}

// Equipment type
export interface Equipment {
  id: string
  ownerId: string
  name: string
  category: string
  description: string
  pricePerDay: number
  images: string[]
  location: string
  availability: boolean
  specifications?: Record<string, string>
  createdAt: Date
}

// Booking type
export interface Booking {
  id: string
  equipmentId: string
  farmerId: string
  ownerId: string
  startDate: Date
  endDate: Date
  totalPrice: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  paymentStatus: "pending" | "paid" | "refunded"
  createdAt: Date
}

// Transaction type
export interface Transaction {
  id: string
  bookingId: string
  amount: number
  status: "pending" | "completed" | "failed"
  paymentMethod: string
  createdAt: Date
}

// Notification type
export interface Notification {
  id: string
  userId: string
  type: "booking" | "payment" | "message" | "system"
  title: string
  message: string
  read: boolean
  createdAt: Date
  link?: string
}
