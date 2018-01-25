class Session {
  constructor ({ msg, SessionModel, UserModel }) {
    this.msg = msg
    this.SessionModel = SessionModel
    this.UserModel = UserModel
  }

  get chatId () {
    return this.msg.chat.id
  }

  get userId () {
    return this.msg.from.id
  }

  get isLoaded () {
    return !!this.model
  }

  async load () {
    const currentSession = await this.SessionModel.findOne({
      chat_id: this.chatId
    })

    const user = await this.UserModel.findOne({
      tg_id: this.userId
    })

    if (user) this.user = user

    if (!currentSession) return this
    this.model = currentSession
    return this
  }

  async getUser () {
    return this.user || this.UserModel.find({ tg_id: this.userId })
  }

  async makeUser () {
    const user = new this.UserModel({
      tg_id: this.userId,
      data: {}
    })

    this.user = user
    await user.save()
    return this
  }

  async start (command) {
    if (!this.user) await this.makeUser()

    await this.SessionModel.findOneAndRemove({
      chat_id: this.chatId,
      user_id: this.userId
    })

    this.model = new this.SessionModel({
      chat_id: this.chatId,
      user_id: this.userId,
      command: command.name,
      step: 0
    })

    await this.model.save()

    return this
  }

  async finish () {
    return this.model.remove({ chat_id: this.chatId })
  }

  async getData () {
    return (await this.getUser()).data
  }

  async setData (data) {
    this.user.data = data
    return this.user.save()
  }

  async setProp (key, value) {
    this.user.data[key] = value
    return this.user.save()
  }
}

module.exports = Session
