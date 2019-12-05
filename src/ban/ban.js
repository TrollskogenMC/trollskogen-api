export default function buildMakeBan() {
  return function({
    reason,
    user_id,
    issued_by,
    is_cancelled,
    expiry_date,
    id,
    issued_date,
    cancelled_by,
    cancelled_date
  }) {
    if (!reason) {
      throw new Error("Ban must have a reason.");
    }

    if (reason.length < 2) {
      throw new Error("Ban reason must be longer than 2 characters.");
    }

    if (!user_id) {
      throw new Error("Ban must have a user id.");
    }

    if (!issued_by) {
      throw new Error("Ban must have an issuer id.");
    }

    return Object.freeze({
      getCancelledBy: () => (cancelled_by ? cancelled_by : null),
      getCancelledDate: () => (cancelled_date ? cancelled_date : null),
      getExpiryDate: () => (expiry_date ? new Date(expiry_date) : null),
      getId: () => id,
      getIssuedBy: () => issued_by,
      getIssuedDate: () => (issued_date ? new Date(issued_date) : new Date()),
      getReason: () => reason,
      getUserId: () => user_id,
      isCancelled: () =>
        typeof is_cancelled !== "boolean" ? is_cancelled : false
    });
  };
}
