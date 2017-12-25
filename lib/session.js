const Session = function Session ({msg}) {
  this.msg = msg

  this.getChatId = function () {
    return this.msg.chat.id
  }
}

module.exports = Session
