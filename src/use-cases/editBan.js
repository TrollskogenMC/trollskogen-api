import makeBan from "../ban/index.js";

export default function({ db }) {
  return async function({ id, ...changes }) {
    if (!id) {
      throw new Error("You must supply an id.");
    }

    const existing = await db.findBanById({
      id
    });

    if (!existing) {
      throw new RangeError("Ban not found.");
    }

    const ban = makeBan({
      ...existing,
      ...changes
    });
    const updated = await db.updateBan({
      cancelled_by: ban.getCancelledBy(),
      cancelled_date: ban.getCancelledDate(),
      expiry_date: ban.getExpiryDate(),
      id: ban.getId(),
      is_cancelled: ban.isCancelled(),
      issued_by: ban.getIssuedBy(),
      issued_date: ban.getIssuedDate(),
      reason: ban.getReason(),
      user_id: ban.getUserId()
    });
    return { ...existing, ...updated };
  };
}
