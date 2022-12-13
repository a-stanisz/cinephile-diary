const { updateUser } = require("../database/repositories/user-repository");

class User {
  constructor(userId, name, role) {
    this._userId = userId;
    this.name = name;
    this.role = role;
    // let limitation;
    // this.role === "premium" ? (limitation = false) : (limitation = true);
    // this.serviceUsage = {
    //   isLimited: limitation,
    //   limit: null,
    //   counter: 0,
    // };
  }
  set changeLimit(newLimit) {
    this.serviceUsage.limit = newLimit;
  }
  save() {
    updateUser(this);
  }
}

module.exports = User;
