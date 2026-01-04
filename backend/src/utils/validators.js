function isValidEmail(email) {
  //basically to see if email is valid for the contact thingy
  if (typeof email !== "string") return false;
  // Basic RFC-ish validation (sufficient for form validation)
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

module.exports = {
  isValidEmail,
};
