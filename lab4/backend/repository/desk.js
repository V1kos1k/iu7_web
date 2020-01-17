const db = require('../db');
const config = require('../config');
const fs = require('fs');
const pump = require('pump');
const readChunk = require('read-chunk');
const fileType = require('file-type');

class DeskRepository {
    constructor() {}

    async getInfo(id) {
        const text = 'SELECT * FROM _desk WHERE id=$1';
        const values = [id];

        try {
            const res = await db.query(text, values);

            if (res.rowCount == 0) return false;
            else if (res.rowCount == 1) {
                const deskInformation = res.rows[0];
                return deskInformation;
            }
        } catch (err) {
            return false;
        }
    }

    async add(deskModel, chatID) {
        const text =
            'INSERT INTO _desk (owner_login, max_people, current_people, title, is_private, gender, ages, city, genres, games, chat_id)' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
        const values = [
            deskModel.owner,
            deskModel.maxPeople,
            1,
            deskModel.title,
            deskModel.isPrivate,
            deskModel.gender,
            deskModel.ages,
            deskModel.city,
            deskModel.genres,
            deskModel.games,
            chatID
        ];
        try {
            const res = await db.query(text, values);
            const curID = await db.query(
                "SELECT currval(pg_get_serial_sequence('_desk','id'))"
            );
            const currentDeskID = curID.rows[0].currval;
            if (!this.addMember(currentDeskID, deskModel.owner)) return false;

            return { desk_id: currentDeskID, chat_id: chatID };
        } catch (err) {
            return false;
        }
    }

    async getImage(id) {
        let path = `${process.cwd()}${config.deskImagePath}${id}`;
        try {
            if (fs.existsSync(path)) {
                let buffer = readChunk.sync(path, 0, fs.statSync(path).size);
                let type = fileType(buffer).mime;
                return {
                    image: buffer.toString('base64'),
                    type: type
                };
            } else {
                return false;
            }
        } catch (err) {
            return -1;
        }
    }

    async changeImage(id, username, image) {
        const deskModel = await this.getInfo(id);

        if (deskModel.owner_login == username) {
            let path = `${process.cwd()}${config.deskImagePath}${id}`;
            if (fs.existsSync(path)) {
                pump(image, fs.createWriteStream(path));
                return 1;
            } else {
                pump(image, fs.createWriteStream(path));
                return 0;
            }
        } else {
            return -1;
        }
    }

    async removeImage(id) {
        let path = `${process.cwd()}${config.deskImagePath}${id}`;
        if (fs.existsSync(path)) {
            fs.unlink(path, () => {});
            return true;
        }
        return false;
    }

    async getMembers(id, state) {
        const text = 'SELECT * FROM _user_desk WHERE desk_id=$1 AND isIn=$2';
        const values = [id, state];

        try {
            const res = await db.query(text, values);
            return res.rows;
        } catch (err) {
            return false;
        }
    }

    async getDesksByTags(tags) {
        let desks = [];
        for (let i = 0; i < tags.length; ++i) {
            const text =
                'SELECT * FROM _desk WHERE $1 = ANY(games) OR $1 = ANY(genres)';
            const values = [tags[i]];

            try {
                const res = await db.query(text, values);
                res.rows.forEach(desk => {
                    desks.push(desk);
                });
            } catch (err) {
                console.error(err);
            }
        }
        return desks;
    }

    async getDesksByCity(city) {
        const text = 'SELECT * FROM _desk WHERE city=$1';
        const values = [city];

        try {
            const res = await db.query(text, values);
            return res.rows;
        } catch (err) {
            return false;
        }
    }

    async getDesksByAges(ages) {
        const text =
            'SELECT * FROM _desk WHERE ages[1] >= $1 AND ages[2] <= $2';
        const values = [ages[0], ages[1]];

        try {
            const res = await db.query(text, values);
            return res.rows;
        } catch (err) {
            return false;
        }
    }

    async getDesksByGender(gender) {
        const text = 'SELECT * FROM _desk WHERE gender=$1';
        const values = [gender];

        try {
            const res = await db.query(text, values);
            return res.rows;
        } catch (err) {
            return false;
        }
    }

    async getAllDesks() {
        const text = 'SELECT * FROM _desk';
        const values = [];

        try {
            const res = await db.query(text, values);
            return res.rows;
        } catch (err) {
            return false;
        }
    }

    async syncMembersCount(id) {
        const currentMembersCount = (await this.getMembers(id, true)).length;
        const text = 'UPDATE _desk SET current_people=$1 WHERE id=$2';
        const values = [currentMembersCount, id];

        try {
            const res = await db.query(text, values);
            return true;
        } catch (err) {
            return false;
        }
    }

    async addMember(id, username) {
        const deskInfo = await this.getInfo(id);

        let isIn = true;
        if (deskInfo.is_private && deskInfo.owner_login != username)
            isIn = false;
        else isIn = true;

        const text =
            'INSERT INTO _user_desk (user_login, desk_id, isIn) VALUES ($1, $2, $3)';
        const values = [username, id, isIn];
        try {
            const res = await db.query(text, values);
            if (isIn) if (!(await this.syncMembersCount(id))) return false;
            return !isIn ? -4 : true;
        } catch (err) {
            return false;
        }
    }

    async removeMember(id, username) {
        const text =
            'DELETE FROM _user_desk WHERE user_login=$1 AND desk_id=$2';
        const values = [username, id];

        try {
            const res = await db.query(text, values);
            if (res.rowCount == 0) {
                return false;
            } else {
                if (!(await this.syncMembersCount(id))) return false;

                return true;
            }
        } catch (err) {
            return false;
        }
    }

    async removeAllMembersFromDesk(id) {
        const text = 'DELETE FROM _user_desk WHERE desk_id=$1';
        const values = [id];

        try {
            const res = await db.query(text, values);
            if (res.rowCount == 0) {
                return false;
            } else {
                return true;
            }
        } catch (err) {
            return false;
        }
    }

    async remove(id) {
        const text = 'DELETE FROM _desk WHERE id=$1';
        const values = [id];

        try {
            const res = await db.query(text, values);
            if (res.rowCount == 0) {
                return false;
            } else {
                return true;
            }
        } catch (err) {
            return false;
        }
    }

    async acceptMember(id, username) {
        const text =
            'UPDATE _user_desk SET isIn=$1 WHERE user_login=$2 AND desk_id=$3';
        const values = [true, username, id];

        try {
            const res = await db.query(text, values);
            if (res.rowCount == 0) {
                return false;
            } else {
                this.syncMembersCount(id);
                return true;
            }
        } catch (err) {
            return false;
        }
    }

    async declineMember(id, username) {
        const text =
            'DELETE FROM _user_desk WHERE user_login=$1 AND desk_id=$2 AND isIn=$3';
        const values = [username, id, false];

        try {
            const res = await db.query(text, values);
            if (res.rowCount == 0) {
                return false;
            } else {
                return true;
            }
        } catch (err) {
            return false;
        }
    }

    async getDesksByUser(username, isOwner) {
        let text = '';
        let values = [];
        if (isOwner == false) {
            text =
                'SELECT * FROM _user_desk JOIN _desk ON _desk.id = _user_desk.desk_id WHERE user_login=$1';
            values = [username];
        } else if (isOwner == true) {
            text =
                'SELECT * FROM _desk JOIN _user_desk ON _desk.id = _user_desk.desk_id  WHERE owner_login=$1';
            values = [username];
        } else {
            return false;
        }

        try {
            const res = await db.query(text, values);

            if (res.rowCount == 0) return false;
            else if (res.rowCount > 0) {
                const desks = res.rows;
                return desks;
            }
        } catch (err) {
            return false;
        }
    }

    async getDeskByChatID(chatID) {
        const text = 'SELECT * FROM _desk WHERE chat_id=$1';
        const values = [chatID];

        try {
            const res = await db.query(text, values);
            return res.rows[0];
        } catch (err) {
            return false;
        }
    }
}

module.exports = DeskRepository;
