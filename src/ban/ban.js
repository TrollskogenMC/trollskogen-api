export default function buildMakeBan() {
  return function({ reason, userId, issuerId, expiryDate }) {
    if (!reason) {
      throw new Error("Ban must have a reason.");
    }

    if (reason.length < 2) {
      throw new Error("Ban reason must be longer than 2 characters.");
    }

    if (!userId) {
      throw new Error("Ban must have a user id.");
    }

    if (!issuerId) {
      throw new Error("Ban must have an issuer id.");
    }

    return Object.freeze({
      getUserId: () => userId,
      getIssuedDate: () => new Date(),
      getIssuedBy: () => issuerId,
      getReason: () => reason,
      getExpiryDate: () => (expiryDate ? new Date(expiryDate) : null),
      isCancelled: () => false,
      getCancelledBy: () => null,
      getCancelledDate: () => null
    });
  };
}