import makeBan from "../ban/index.js";

export default function makeAddBan({ db }) {
  return async function(banInfo) {
    const ban = makeBan(banInfo);

    return db.insertBan({
      user_id: ban.getUserId(),
      issued_date: ban.getIssuedDate(),
      issued_by: ban.getIssuedBy(),
      reason: ban.getReason(),
      expiry_date: ban.getExpiryDate(),
      is_cancelled: ban.isCancelled(),
      cancelled_by: ban.getCancelledBy(),
      cancelled_date: ban.getCancelledDate()
    });
  };
}
