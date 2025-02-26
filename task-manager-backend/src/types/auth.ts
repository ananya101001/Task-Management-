export interface AuthUser {
  id: number; // Ensure this matches the type of `id` in your database
  username: string;
  email: string;
  // Add other properties as needed
}
  