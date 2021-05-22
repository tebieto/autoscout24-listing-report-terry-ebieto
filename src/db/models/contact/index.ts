import { DataTypes, Model, } from 'sequelize';
import { ContactAttributes } from '../../../interfaces/contact';
import { sequelize } from '../index';
import {  v4 as uuid } from 'uuid';
/**
 * Creating Contact Model which is passed to sequelize
 * And persisted to database
 */

interface ContactModel
  extends Model<ContactAttributes>,
    ContactAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

const Contact = sequelize.define<ContactModel>(
	'Contact',
	{	
		uuid: {
			allowNull: false,
			autoIncrement: false,
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
				model: 'Report',
				key: 'uuid'
			}
		},
		contact_date: {
			allowNull: true,
			type: DataTypes.DATE
		},
	}
);


Contact.beforeCreate(async (contact) => {
	contact.uuid = await uuid();
});

export default Contact;