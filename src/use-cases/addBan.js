import makeBan from "../ban/index.js";

export default function makeAddBan({ db }) {
  return async function(banInfo) {
    const ban = makeBan(banInfo);

    return db.insertBan({
      cancelled_by: ban.getCancelledBy(),
      cancelled_date: ban.getCancelledDate(),
      expiry_date: ban.getExpiryDate(),
      is_cancelled: ban.isCancelled(),
      issued_by: ban.getIssuedBy(),
      issued_date: ban.getIssuedDate(),
      reason: ban.getReason(),
      user_id: ban.getUserId()
    });
  };
}
