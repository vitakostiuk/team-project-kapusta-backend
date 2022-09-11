const {User} = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async (req, res) => {
    const  {path: tmpUpload, originalname} = req.file;
    const {_id: id} = req.user;
    const imageName = `${id}_${originalname}`;
    const avatar = await Jimp.read(tmpUpload);
    await avatar.resize(250, 250).write(tmpUpload);
    try {
        const resultUpload = path.join(avatarDir, imageName);
        await fs.rename(tmpUpload, resultUpload);
        const avatarURL = path.join('public', 'avatars', imageName);
        await User.findByIdAndUpdate(req.user._id, {avatarURL});
        res.json({avatarURL});
    } catch (error) {
        await fs.unlink(tmpUpload);
        throw error;
    }
};

module.exports = updateAvatar;