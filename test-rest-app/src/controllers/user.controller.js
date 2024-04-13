const { pool } = require('../db/pool');
const { v4: uuidv4 } = require('uuid');

const getUsers = async (req,res)=>{
    const uid =  await uuidv4();
    try
    {
        const response = await pool.query('SELECT * FROM "user"');
        console.log(JSON.stringify(response.rows));
        res
            .status(200)
            .set('correlation-id',uid)
            .json(response.rows);
        return
    }
    catch(err){
        const response = {
            message: 'Failed to fetch users',
            error: err.message
        };
        console.log(JSON.stringify(response));
        res
            .status(500)
            .set('correlation-id', uid)
            .json(response);
        return
    }
};

const createUser = async (req,res)=>{
    const uid =  await uuidv4();
    try{
        const {name} = req.body;
        if(name === undefined){
            const response = {
                message: 'Failed to add user',
                error: 'invalid request body'
            };
            console.log(JSON.stringify(response));
            res
                .status(400)
                .set('correlation-id', uid)
                .json(response);
            return
        }
        const user = await pool.query('INSERT INTO "user" (name) VALUES($1) RETURNING *',[name]);
        const response = {
            message: 'User Added Successfully',
            body: user.rows[0]
        };
        console.log(JSON.stringify(response));
        res
            .status(200)
            .set('correlation-id', uid)
            .json(response);
        return
    } catch(err){
        const response = {
            message: 'Failed to add User',
            error: err.message
        };
        console.log(JSON.stringify(response));
        res
            .status(500)
            .set('correlation-id',uid)
            .json(response);
        return
    }

};

// const getUserById = async(req,res) => {
//     const id = req.params.id;
//     const response = await pool.query('SELECT * FROM users WHERE id = $1',[id]);
//     res.json(response.rows);
// };

// const deleteUser = async(req,res) =>{
//     const id = req.params.id;
//     const response = await pool.query('DELETE FROM users WHERE id = $1',[id]);
//     console.log(response);
//     res.json(`User ${id} deleted successfully`);
// };

// const updateUser = async(req,res) => {
//     const id = req.params.id;
//     const {name, email} = req.body;
//     const response = await pool.query('UPDATE users SET name = $1, email=$2 WHERE id = $3',[name, email,id]);
//     console.log(response);
//     res.json('User updated successfully');
// };

module.exports = {
    getUsers,
    createUser,
}