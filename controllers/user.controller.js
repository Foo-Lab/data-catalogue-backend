const { User } = require('../models/index.js');
const crypto = require('crypto');


const create = async (req, res) => {
    const { name, username, email, password, is_admin } = req.body;
    if (!(name && username && email && password && is_admin )) {
        return res.status(400).send({
            message: 'name, username, email, password, is_admin required.'
        });
    }

    try {
        const usr = await User.create({
            name, username, email, password, is_admin
        });
        return res.send(usr)
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findAll = async (req, res) => {
    try {
        const usr = await User.findAll();
        return res.send(usr)
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const findOne = async (req, res) => {
    const { id } = req.params;

    try {
        const usr = await User.findByPk(id);

        if (!usr) {
            return res.status(404).send({
                message: `User with id ${id} not found`
            });
        } else {
            return res.send(usr);
        }
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (! (name)) {
        return res.status(400).send({
            message: 'New name required.'
        });
    }

    try {
        const usr = await User.findByPk(id);

        if (!usr) {
            return res.status(404).send({
                message: `User with id ${id} not found`
            });
        } else {
            usr.name = name;
            usr.save();
            return res.send(usr);
        }
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const usr = await User.findByPk(id);

        if (!usr) {
            return res.status(404).send({
                message: `User with id ${id} not found`
            });
        } else {
            await usr.destroy();
            return res.send(usr);
        }
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};



const login = async (req, res) => {
    const { username, password } = req.body; /* put salt here but i know its wrong or at line 123*/
    
    if (! (username && password)) {
        return res.status(400).send({
            message: 'Username and password are required.'
        });
    }

    try {
      
        const user = await User.findOne({ 
            where: {
                username: username
            }
        })
        if (!user) {
            return res.status(404).send({
                message: `User with username ${username} not found`
            });
        } else {
            const genHash = await hashPassword(user.salt, password);
            if (genHash == user.password){
                return res.send('login successful');
            } else{
                return res.status(404).send({
                    message: `Username or Password is wrong`
                });
            }
        }
    } catch (error) {
        return res.status(500).send({
            message: `Unable to connect to the database: ${error}`
        });
    }
};


const hashPassword = ((salt, password) => {
    console.log(salt, password)
    const hash = crypto.pbkdf2Sync(
        password, 
        salt,  
        1000, 
        64, 
        'sha512'
    ).toString(`hex`); 
    return hash ;
});



module.exports = {
    create,
    findAll,
    findOne,
    update,
    remove,
    login,
}