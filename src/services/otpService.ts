export interface OtpData {
  email: string;
  codeOtp: string;
}

export const verifyOtp = async (data: OtpData) => {
  const response = await fetch("http://localhost:8080/api/auth/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "verify-otp failed");
  }

  // ✅ API returns just a string
  return response.text();
};
