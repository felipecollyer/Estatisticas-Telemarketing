export function ValidePassword(data) {
  const { password, confirmPassword } = data;
  if (password !== confirmPassword) {
    return false;
  } else {
    return true;
  }
}
