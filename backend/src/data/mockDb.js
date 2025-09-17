const bookings = [];
const loyaltyMembers = [];
const feedbackEntries = [];

const addBooking = (booking) => {
  bookings.push(booking);
  return booking;
};

const listBookings = () => bookings;

const addLoyaltyMember = (member) => {
  loyaltyMembers.push(member);
  return member;
};

const findLoyaltyMemberByEmail = (email) => loyaltyMembers.find((member) => member.email.toLowerCase() === email.toLowerCase());

const addFeedbackEntry = (feedback) => {
  feedbackEntries.push(feedback);
  return feedback;
};

const listFeedback = () => feedbackEntries;

const resetStore = () => {
  bookings.length = 0;
  loyaltyMembers.length = 0;
  feedbackEntries.length = 0;
};

export { addBooking, listBookings, addLoyaltyMember, findLoyaltyMemberByEmail, addFeedbackEntry, listFeedback, resetStore };
