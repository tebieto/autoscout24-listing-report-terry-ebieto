// /models/book.ts
import { DataTypes, Model, } from 'sequelize';
import { ListingAttributes } from '../../../interfaces/listing';
import { sequelize } from '../index';
import {  v4 as uuid } from 'uuid';
/**
 * Creating List Model which is passed to sequelize
 * And persisted to database
 */

export interface ListingModel
  extends Model<ListingAttributes>,
    ListingAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

const Listing = sequelize.define<ListingModel>(
	'Listing',
	{
		uuid: {
			primaryKey: true,
			type: DataTypes.UUID,
			unique: true,
		},
		id: {
			unique: false,
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		report_uuid: {
			unique: false,
			allowNull: false,
			type: DataTypes.UUID,
			references: {
				model: 'Reports',
				key: 'uuid'
			}
		},
		make: {
			allowNull: false,
			unique: false,
			type: DataTypes.STRING,
		},
		price: {
			allowNull: false,
			unique: false,
			type: DataTypes.INTEGER,
		},
		mileage: {
			allowNull: false,
			unique: false,
			type: DataTypes.INTEGER,
		},
		seller_type: {
			allowNull: false,
			unique: false,
			type: DataTypes.STRING,
		}

	}
);

Listing.beforeCreate(async (listing) => {
	listing.uuid = await uuid();
});

export default Listing;