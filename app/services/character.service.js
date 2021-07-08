const responseCodes = require('../responseCodes')
const {executeQuery} = require('../database/database');

const handleSqlError = (sqlRet) => {
    console.error(sqlRet);
    return {
        error: {
            name: 'SQLError',
            message: 'An SQL error was encountered.',
            statusCode: 500
        },
        data: undefined
    };
};

const getCharacters = async () => {
    const ret = await executeQuery('SELECT * FROM `character`');
    if (ret.code) {
        return handleSqlError(ret);
    }
    return {
        error: null,
        data: ret
    };
};

const getCharacterById = async (id) => {
    const ret = await executeQuery(`SELECT * FROM \`character\` WHERE \`characterId\` = ${id};`);
    if (ret.code) {
        return handleSqlError(ret);
    }
    if (ret && ret.length === 0) {
        return {
            error: {
                name: 'IdNotFound',
                message: `A character with id '${id}' was not found.`,
                statusCode: responseCodes.BAD_REQUEST
            },
            data: undefined
        };
    }
    return {
        error: null,
        data: ret
    };
};

const createCharacter = async (data) => {
    const ret = await executeQuery(`INSERT INTO \`character\` (\`name\`, \`class\`, \`level\`) VALUES ("${data.name}", "${data.class}", ${data.level})`);
    if (ret.code) {
        return handleSqlError(ret);
    }
    return {
        error: null,
        data: {
            id: ret.insertId
        }
    };
};

const updateCharacter = async (data) => {
    const ret = await executeQuery(`UPDATE \`character\` SET \`class\` = "${data.class}", \`level\` = ${data.level} WHERE \`characterId\` = ${data.characterId};`);
    if (ret.code) {
        return handleSqlError(ret);
    }
    return {
        error: null,
        data: undefined
    };
};

const deleteCharacter = async (id) => {
    const ret = await executeQuery(`DELETE FROM \`character\` WHERE \`characterId\` = ${id};`);
    if (ret.code) {
        return handleSqlError(ret);
    }
    return {
        error: null,
        data: undefined
    };
};

module.exports = {
    getCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
};