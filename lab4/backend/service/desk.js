const DeskRepository = require('../repository/desk');
const UserRepository = require('../repository/user');
const MessageRepository = require('../repository/messages');

class DeskService {
    constructor() {
        this.deskRepository = new DeskRepository();
        this.userRepository = new UserRepository();
        this.messageRepository = new MessageRepository();
    }

    _selectDesksByAge(ages, desks) {
        let selection = [];
        desks.forEach(desk => {
            if (desk.ages[0] >= ages[0] && desk.ages[1] <= ages[1]) {
                selection.push(desk);
            }
        });

        return selection;
    }

    _selectDesksByCity(city, desks) {
        let selection = [];
        desks.forEach(desk => {
            if (desk.city == city) {
                selection.push(desk);
            }
        });

        return selection;
    }

    _selectDesksByGender(gender, desks) {
        let selection = [];
        desks.forEach(desk => {
            if (desk.gender == gender || gender == '2') {
                selection.push(desk);
            }
        });

        return selection;
    }

    async getDesksByParams(deskParams) {
        const separator = ',';
        if (deskParams.tags != '') {
            const tags = deskParams.tags.split(separator);
            let desks = await this.deskRepository.getDesksByTags(tags);
            if (deskParams.age != '') {
                const ages = deskParams.age.split(separator);
                desks = this._selectDesksByAge(ages, desks);
            }

            if (deskParams.city != '') {
                desks = this._selectDesksByCity(deskParams.city, desks);
            }

            if (deskParams.gender != '') {
                desks = this._selectDesksByGender(deskParams.gender, desks);
            }
            if (desks.length == 0) return false;
            else {
                return this._getUnique(desks, 'id');
            }
        } else if (deskParams.city != '') {
            let desks = await this.deskRepository.getDesksByCity(
                deskParams.city
            );
            if (deskParams.age != '') {
                const ages = deskParams.age.split(separator);
                desks = this._selectDesksByAge(ages, desks);
            }
            if (deskParams.gender != '') {
                desks = this._selectDesksByGender(deskParams.gender, desks);
            }
            return desks;
        } else if (deskParams.age != '') {
            const ages = deskParams.age.split(separator);
            let desks = await this.deskRepository.getDesksByAges(ages);
            if (deskParams.gender != '') {
                desks = this._selectDesksByGender(deskParams.gender, desks);
            }
            return desks;
        } else if (deskParams.gender != '') {
            let desks = false;
            if (deskParams.gender == '2') {
                desks = await this.deskRepository.getAllDesks();
            } else {
                desks = await this.deskRepository.getDesksByGender(
                    deskParams.gender
                );
            }
            return desks;
        } else {
            return await this.deskRepository.getAllDesks();
        }
    }

    async getDesk(id) {
        return this.deskRepository.getInfo(id);
    }

    async createNewDesk(deskModel) {
        const chatID = await this.messageRepository.createDeskChat();
        return this.deskRepository.add(deskModel, chatID);
    }

    async changeImage(id, username, image) {
        return this.deskRepository.changeImage(id, username, image);
    }

    async getImage(id) {
        return this.deskRepository.getImage(id);
    }

    async getMembers(id, state) {
        let membersList = [];
        let users = await this.deskRepository.getMembers(id, state);
        if (!users) {
            return false;
        } else {
            for (let i = 0; i < users.length; ++i) {
                membersList.push(
                    await this.userRepository.getInfo(users[i].user_login)
                );
            }
            return membersList;
        }
    }

    _isMember(username, membersList) {
        for (let i = 0; i < membersList.length; ++i) {
            if (username == membersList[i].login) return true;
        }
        return false;
    }

    _isFull(deskModel) {
        if (deskModel.current_people >= deskModel.max_people) return true;
        else return false;
    }

    _calculateAge(birthday) {
        var ageDifMs = Date.now() - new Date(birthday).getTime();
        var ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    _isUserValidForDesk(userModel, deskModel) {
        let result = true;
        if (!(userModel.gender == deskModel.gender || deskModel.gender == 2)) {
            result = false;
        }

        const userAge = this._calculateAge(userModel.date_birth);

        if (!(userAge >= deskModel.ages[0] && userAge <= deskModel.ages[1])) {
            result = false;
        }
        return result;
    }

    async addMember(id, username) {
        const deskInfo = await this.getDesk(id);
        const waitingList = await this.getMembers(id, false);
        const membersList = await this.getMembers(id, true);
        const userInfo = await this.userRepository.getInfo(username);

        if (deskInfo == false) return -3;
        if (!this._isUserValidForDesk(userInfo, deskInfo)) return -2;
        if (this._isFull(deskInfo)) return -1;
        if (
            !this._isMember(username, membersList) &&
            !this._isMember(username, waitingList)
        )
            return this.deskRepository.addMember(id, username);
    }

    async acceptMember(id, username, deskOwner) {
        const deskInfo = await this.getDesk(id);
        const isFull = deskInfo.current_people < deskInfo.max_people;
        if (deskInfo.owner_login == deskOwner && isFull)
            return this.deskRepository.acceptMember(id, username);
        else if (!isFull) return -1;
        else return false;
    }

    async declineMember(id, username, deskOwner) {
        const deskInfo = await this.getDesk(id);
        if (deskInfo.owner_login == deskOwner)
            return this.deskRepository.declineMember(id, username);
        else return false;
    }

    async removeMember(id, requester) {
        const deskInfo = await this.getDesk(id);
        const chatID = deskInfo.chat_id;
        if (deskInfo.owner_login == requester) {
            await this.deskRepository.removeAllMembersFromDesk(id);
            await this.deskRepository.removeImage(id);
            const result = await this.deskRepository.remove(id);

            if (chatID != null)
                await this.messageRepository.removeChat(deskInfo.chat_id);
            return result;
        } else return this.deskRepository.removeMember(id, requester);
    }

    _getUnique(arr, comp) {
        const unique = arr
            .map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => arr[e])
            .map(e => arr[e]);

        return unique;
    }

    async getUsersDesks(username, state) {
        const data = await this.deskRepository.getDesksByUser(username, state);
        try {
            const uniqueData = this._getUnique(data, 'id');
            return uniqueData;
        } catch (err) {
            return false;
        }
    }

    async getByChatID(id) {
        return this.deskRepository.getDeskByChatID(id);
    }
}

module.exports = DeskService;
