export function ValidetePassword(data) {
  const { password, confirmPassword } = data;
  if (password !== confirmPassword) {
    return false;
  } else {
    return true;
  }
}
