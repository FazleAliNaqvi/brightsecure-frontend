/**
 * Extract error message from API responses consistently
 * Handles various error response formats from the backend
 */
export function getErrorMessage(error: any, fallback = 'Something went wrong'): string {
  return (
    error?.response?.data?.error?.message ||
    error?.response?.data?.message ||
    error?.response?.data?.detail ||
    error?.message ||
    fallback
  );
}
