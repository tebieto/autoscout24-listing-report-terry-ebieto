import { DataTypes, Model, } from 'sequelize';
import { ContactAttributes } from '../../../interfaces/contact';
import { sequelize } from '../index';
import {  v4 as uuid } from 'uuid';
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
			unique: false,
			allowNull: false,
			type: DataTypes.INTEGER
		},
		report_uuid: {
			allowNull: false,
			unique: false,
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

Contact.beforeCreate(async (contact) => {
	contact.uuid = await uuid();
});



export default Contact;