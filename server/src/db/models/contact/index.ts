import { DataTypes, Model, } from 'sequelize';
import { ContactAttributes } from '../../../interfaces/contact';
import { sequelize } from '../index';
/**
 * Creating Contact Model which is passed to sequelize
 * And persisted to database
 */

export interface ContactModel
  extends Model<ContactAttributes>,
    ContactAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

const Contact = sequelize.define<ContactModel>(
	'Contact',
	{	
		uuid: {
			primaryKey: true,
			type: DataTypes.UUID,
			unique: true,
		},
		listing_id: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		report_uuid: {
			allowNull: false,
			type: DataTypes.UUID,
			references: {
				model: 'Reports',
				key: 'uuid'
			}
		},
		contact_date: {
			allowNull: true,
			type: DataTypes.STRING
		},
	}
);

export default Contact;