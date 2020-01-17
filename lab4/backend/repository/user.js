const db = require('../db');
const config = require('../config');
const fs = require('fs');
const pump = require('pump');
const readChunk = require('read-chunk');
const fileType = require('file-type');

class UserRepository {
    constructor() {}

    async add(userModel) {
        const text =
            'INSERT INTO _user (login, email, password_hash, date_birth, gender) VALUES ($1, $2, $3, $4, $5)';
        const values = [
            userModel.username,
            userModel.email,
            userModel.password,
            userModel.birthDate,
            userModel.gender
        ];

        try {
            const res = await db.query(text, values);
            return true;
        } catch (err) {
            return false;
        }
    }

    async isExists(userModel) {
        const text = 'SELECT * FROM _user WHERE login=$1 AND password_hash=$2';
        const values = [userModel.username, userModel.password];

        try {
            const res = await db.query(text, values);
            if (res.rowCount == 0) return false;
            else if (res.rowCount == 1) return true;
        } catch (err) {
            return false;
        }
    }

    async getInfo(_username) {
        const text = 'SELECT * FROM _user WHERE login=$1';
        const values = [_username];

        try {
            const res = await db.query(text, values);

            if (res.rowCount == 0) return false;
            else if (res.rowCount == 1) {
                const userProfile = res.rows[0];
                userProfile.date_birth = new Date(
                    userProfile.date_birth.getTime() -
                        userProfile.date_birth.getTimezoneOffset() * 60119
                );
                userProfile.date_birth = userProfile.date_birth
                    .toJSON()
                    .slice(0, 10);
                delete userProfile.password_hash;
                return userProfile;
            }
        } catch (err) {
            return false;
        }
    }

    async changeInfo(userModel) {
        const text =
            'UPDATE _user SET name=$1, surname=$2, date_birth=$3, gender=$4, city=$5, about_me=$6, favorite_genres=$7, favorite_games=$8 WHERE login=$9';
        const values = [
            userModel.newName,
            userModel.newSurname,
            userModel.newBirthDate,
            userModel.newGender,
            userModel.newCity,
            userModel.newAboutMe,
            userModel.newFavoriteGenres,
            userModel.newFavoriteGames,
            userModel.target
        ];

        try {
            const res = await db.query(text, values);

            if (res.rowCount == 0) return false;
            else if (res.rowCount == 1) return true;
        } catch (err) {
            return false;
        }
    }

    async saveImage(username, image) {
        let path = `${process.cwd()}${config.userImagePath}${username}`;

        try {
            if (fs.existsSync(path)) {
                return 0;
            } else {
                pump(image, fs.createWriteStream(path));
                return 1;
            }
        } catch (err) {
            return -1;
        }
    }

    async changeImage(username, image) {
        let path = `${process.cwd()}${config.userImagePath}${username}`;

        try {
            if (fs.existsSync(path)) {
                pump(image, fs.createWriteStream(path));
                return 1;
            } else {
                pump(image, fs.createWriteStream(path));
                return 0;
            }
        } catch (err) {
            return -1;
        }
    }

    async getImage(username) {
        let path = `${process.cwd()}${config.userImagePath}${username}`;
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
}

module.exports = UserRepository;
