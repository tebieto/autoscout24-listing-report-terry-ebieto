// /models/book.ts
import { DataTypes, Model, } from 'sequelize';
import { ReportAttributes } from '../../../interfaces/report';
import { sequelize } from '../index';
import {  v4 as uuid } from 'uuid';
import Listing from '../listing';
import Contact from '../contact';
/**
 * Creating List Model which is passed to sequelize
 * And persisted to database
 */

export interface ReportModel
  extends Model<ReportAttributes>,
    ReportAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

const Report = sequelize.define<ReportModel>(
	'Report',
	{
		uuid: {
			primaryKey: true,
			type: DataTypes.UUID,
			unique: true,
		},
		listings_csv_link: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		listings_csv_name: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		contacts_csv_link: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		contacts_csv_name: {
			allowNull: false,
			type: DataTypes.STRING,
		},

	}
);

Report.beforeCreate(async (report) => {
	console.log(report);
	report.uuid = await uuid();
});

/**
 * Associate report to Listing and Contact Model
 * With this we can eager load contacts and listings belonging to a report
 */

Report.hasMany(Listing, { sourceKey: 'uuid', foreignKey: 'report_uuid', as: 'listings' });
Report.hasMany(Contact, { sourceKey: 'uuid', foreignKey: 'report_uuid', as: 'contacts' });

export default Report;