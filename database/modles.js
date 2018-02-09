const Sequelize = require("sequelize");
const DB = require("../config.json").DB;
const datatypes = Sequelize.DataTypes;

const db = new Sequelize(DB.DATABASE, DB.USER, DB.PASSWORD, {
    host: DB.HOST,
    dialect: DB.DIALECT,
    // logging: false
});

const user = db.define('users', {
    userId: {
        type: datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: datatypes.STRING,
        allowNull: false,
    },
    phone: {
        type: datatypes.INTEGER,
        unique: true,
        allowNull: false
    },
    email: {
        type: datatypes.STRING,
        unique: true
    },
    password: {
        // Implement Hashing
        type: datatypes.STRING,
        allowNull: false,
    },
    address: {
        type: datatypes.STRING
    },
    respect: {
        type: datatypes.INTEGER,
        defaultValue: 0
    },
    isPopular: {
        type: datatypes.BOOLEAN,
        defaultValue: false
    }
}, {
    freezeTableName: true
});

const order = db.define('orders', {
    userId: {
        type: datatypes.INTEGER,
        foreignKey: true,
    },
    orderId: {
        type: datatypes.STRING,
        allowNull: false,
    },
    timeOfOrder: {
        type: datatypes.DATE,
        defaultValue: datatypes.DATE,
        allowNull: false
    }
}, {
    freezeTableName: true
});


const orderDetails = db.define('orders', {
    userId: {
        type: datatypes.INTEGER,
        allowNull: false,
    },
    orderId: {
        type: datatypes.STRING,
        allowNull: false,
    },
    timeOfOrder: {
        type: datatypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    designId: {
        type: datatypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

const design = db.define('orders', {
    designId: {
        type: datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    color: {
        type: datatypes.STRING,
    },
    imagesAndDetails: {
        type: datatypes.TEXT,
    },
    textAndDetails: {
        type: datatypes.TEXT,
    },
}, {
    freezeTableName: true
});

Promise.all([
    user.sync(),
    order.sync(),
    orderDetails.sync(),
    design.sync()
]).then(() => console.log('Database connected!'))