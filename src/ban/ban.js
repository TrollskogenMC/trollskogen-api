export default function buildMakeBan() {
  return function({ reason, user_id, issuer_id, expiry_date }) {
    if (!reason) {
      throw new Error("Ban must have a reason.");
    }

    if (reason.length < 2) {
      throw new Error("Ban reason must be longer than 2 characters.");
    }

    if (!user_id) {
      throw new Error("Ban must have a user id.");
    }

    if (!issuer_id) {
      throw new Error("Ban must have an issuer id.");
    }

    return Object.freeze({
      getCancelledBy: () => null,
      getCancelledDate: () => null,
      getExpiryDate: () => (expiry_date ? new Date(expiry_date) : null),
      getIssuedBy: () => issuer_id,
      getIssuedDate: () => new Date(),
      getReason: () => reason,
      getUserId: () => user_id,
      isCancelled: () => false
    });
  };
}
