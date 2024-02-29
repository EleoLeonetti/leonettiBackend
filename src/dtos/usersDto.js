class UserDto{
    constructor(newUser){
        this.first_name = newUser.first_name
        this.last_name = newUser.last_name
        this.birthdate = newUser.birthdate
        this.email = newUser.email
        this.role = newUser.role
        this.password = newUser.password
        this.fullname = `${newUser.first_name} ${newUser.last_name}`
    }
}

module.exports = {
    UserDto
}