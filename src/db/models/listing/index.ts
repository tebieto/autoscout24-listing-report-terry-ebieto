// /models/book.ts
import { DataTypes, Model, } from 'sequelize';
import { ListingAttributes } from '../../../interfaces/listing';
import { sequelize } from '../index';
import {  v4 as uuid } from 'uuid';
/**
 * Creating List Model which is passed to sequelize
 * And persisted to database
 */

interface ListingModel
  extends Model<ListingAttributes>,
    ListingAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

const Listing = sequelize.define<ListingModel>(
	'Listing',
	{
		uuid: {
			allowNull: false,
			autoIncrement: false,
			primaryKey: true,
			type: DataTypes.UUID,
			unique: true,
		},

		id: {
			allowNull: false,
			autoIncrement: false,
			primaryKey: true,
			type: DataTypes.INTEGER,
			unique: true,
		},
		report_uuid: {
			allowNull: false,
			type: DataTypes.UUID,
			references: {
				model: 'Report',
				key: 'uuid'
			}
		},
		make: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		price: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		mileage: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		seller_type: {
			allowNull: false,
			type: DataTypes.INTEGER,
		}

	}
);

Listing.beforeCreate(async (listing) => {
	listing.uuid = await uuid();
});

export default Listing;