export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  // In a real application, use bcrypt to compare the password with the hashed password
  // For mock data, you can simply compare the passwords
  return password === hashedPassword;
}
