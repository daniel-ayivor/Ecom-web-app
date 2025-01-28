const { DataTypes, ENUM } = require('sequelize');
const sequelize = require('../Database/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // image: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    //     validate: {
    //         isUrl: true, 
    //         isImage(value) {
    //             const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    //             if (value && !validExtensions.some(ext => value.endsWith(ext))) {
    //                 throw new Error('Only image formats (.jpg, .jpeg, .png, .gif, .webp) are allowed');
    //             }
    //         }
    //     }
    // },
    image: {
        type: DataTypes.STRING, // Expecting a string for the file path
        allowNull: false,
        // Remove isUrl validation since it's a local path
        validate: {
            notEmpty: true, // Ensure the field is not empty
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT, 
        allowNull: false,
        validate: {
            isFloat: true,
            min: 0  
        }
    },
    text: {
        type: DataTypes.TEXT, 
        allowNull: true
    },
    rating: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5'), 
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM('male', 'female', 'kids', 'adults'), 
        allowNull: false,
    },
    size: {
        type: DataTypes.ENUM('XL', 'L', 'XXL', 'MEDIUM', 'SM'), 
        allowNull: false,
    }

}, {
    tableName: 'products',
    timestamps: true 
});

module.exports = Product;
