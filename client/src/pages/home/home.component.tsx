import React, { useState } from 'react';
import { PostResponseProps, uploadCSVsProps, HTMLInputEvent } from '../../interfaces';
import { uploadCSVs } from '../../utils/upload';
import { HomeContainer } from './home.styles';

const Home = (): JSX.Element => {

	const defaulReports: PostResponseProps[] = [];
	const defaultFile = new File([''], 'filename');
	const defaultCSVFiles: uploadCSVsProps = { contactsCSV: defaultFile, listingsCSV: defaultFile };
    
	const [csvFiles, setCSVFiles] = useState(defaultCSVFiles);
	const [reports, setReports] = useState(defaulReports);
        
	const handleCSVChange = async (e: HTMLInputEvent ): Promise<void> => {
		const { name } = e.target;
		const file = e.target && e.target.files ? e.target.files[0] : null;
		setCSVFiles({ ...csvFiles, [name]: file });
	};
    
	const handleCSVUpload = async () => {
		const report = await uploadCSVs(csvFiles);
		setReports([...reports, report]);
	};

	return (
		<HomeContainer>
			<h2>Upload CSV</h2>
			<div className="upload-csvs">
				<div className="upload-contacts">
					<fieldset>
						<legend>Contacts CSV</legend>
						<input onChange={handleCSVChange} accept=".csv" aria-label="upload-contact-csv" type="file" name="contactsCSV"  id="contacts" />
					</fieldset>
					<fieldset>
						<legend>Listings CSV</legend>
						<input onChange={handleCSVChange} accept=".csv" aria-label="upload-listings-csv" type="file" name="listingsCSV" id="listings" />
					</fieldset>
					<button onClick={handleCSVUpload} type="submit">Upload</button>
				</div>
			</div>
			<h2>Uploaded Records</h2>
			<table>
				<thead>
					<tr>
						<th>No.</th>
						<th>Date</th>
						<th>Listings(CSV)</th>
						<th>Contacts(CSV)</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1.</td>
						<td>{new Date().toDateString()}</td>
						<td>Listings.csv</td>
						<td>Contacts.csv</td>
						<td><button>View Report</button></td>
					</tr>
				</tbody>
			</table>
		</HomeContainer>
	);
    
}; 
export default Home;