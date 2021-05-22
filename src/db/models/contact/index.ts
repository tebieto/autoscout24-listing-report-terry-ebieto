import { DataTypes, Model, } from 'sequelize';
import { ContactAttributes } from '../../../interfaces/contact';
import { sequelize } from '../index';

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
		listing_id: {
			allowNull: false,
			autoIncrement: false,
			primaryKey: true,
			type: DataTypes.UUID,
			unique: true,
		},
		contact_date: {
			allowNull: true,
			type: DataTypes.DATE
		},
	}
);

export default Contact;