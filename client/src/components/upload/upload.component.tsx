import React, { useCallback, useState } from 'react';
import { HTMLInputEvent, uploadCSVsProps } from '../../interfaces';
import { uploadCSVs } from '../../utils/upload';
import { UploadStylesContainer } from './upload.styles';
export const Upload = (): JSX.Element => {
	const defaultCSVFiles: uploadCSVsProps = { contactsCSV: null, listingsCSV: null };
	const [csvFiles, setCSVFiles] = useState(defaultCSVFiles);
	const [uploadingState, setUploadingState] = useState(false);
        
	const handleCSVChange = useCallback(async (e: HTMLInputEvent ): Promise<void> => {
		const { name } = e.target;
		const file = e.target && e.target.files ? e.target.files[0] : null;
		setCSVFiles({ ...csvFiles, [name]: file });
	}, [csvFiles]);
    
	const handleCSVUpload = useCallback(async () => {
		if(!uploadingState) {
			setUploadingState(true);
			uploadCSVs(csvFiles).then(() => {
				alert('Reports added successfully');
				window.location.reload();
			})
				.catch((error) => {
					setUploadingState(false);
					error.response ? alert(error.response.data) : alert(error.message);
				});
		}
	}, [uploadingState, csvFiles]);
	return (
		<UploadStylesContainer>
			<h2>Upload CSV</h2>
			<div className="upload-csvs">
				<div className="upload-contacts">
					<fieldset>
						<legend>Contacts CSV</legend>
						<input onChange={handleCSVChange} accept="*.csv" aria-label="upload-contact-csv" type="file" name="contactsCSV"  id="contacts" />
					</fieldset>
					<fieldset>
						<legend>Listings CSV</legend>
						<input onChange={handleCSVChange} accept="*.csv" aria-label="upload-listings-csv" type="file" name="listingsCSV" id="listings" />
					</fieldset>
					<button onClick={handleCSVUpload} type="submit">{uploadingState ? 'Uploading...' : 'Upload'}</button>
				</div>
			</div>
		</UploadStylesContainer>
	);
};