const { UserDto } = require('../dtos/usersDto.js')

class UserRepository {
    constructor(dao){
        this.dao = dao
    }

    async getUsers() {
        return await this.dao.get()
    }

    async getUser(filter){
        return await this.dao.getBy(filter)
    }

    async createUser(newUser){
        const newUserDto = new UserDto(newUser)
        return await this.dao.create(newUserDto)    
    }

    async updateUser(uid, userToUpdate) {
        return await this.dao.update(uid, userToUpdate)
    }

    async deleteUser(uid) {
        return await this.dao.delete(uid)
    }

}

module.exports = { UserRepository }