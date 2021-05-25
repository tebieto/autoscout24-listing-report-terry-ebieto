// /models/book.ts
import { DataTypes, Model, } from 'sequelize';
import { ListingAttributes } from '../../../interfaces/listing';
import { sequelize } from '../index';
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
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		report_uuid: {
			allowNull: false,
			type: DataTypes.UUID,
			references: {
				model: 'Reports',
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
			type: DataTypes.STRING,
		}

	}
);

export default Listing;