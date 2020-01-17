const UserRepository = require('../repository/user');
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createNewUser(userModel) {
        return this.userRepository.add(userModel);
    }

    async isUserExists(userModel) {
        return this.userRepository.isExists(userModel);
    }

    async getProfile(_username) {
        return this.userRepository.getInfo(_username);
    }

    async changeProfile(userModel) {
        return this.userRepository.changeInfo(userModel);
    }

    async addImage(username, image) {
        return this.userRepository.saveImage(username, image);
    }

    async changeImage(username, image) {
        return this.userRepository.changeImage(username, image);
    }

    async getImage(username) {
        return this.userRepository.getImage(username);
    }
}

module.exports = UserService;
