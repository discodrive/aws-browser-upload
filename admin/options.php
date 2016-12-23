<?php 
// Setup Options page for AWS

// royal-court-podcasts
// eu-west-1
// AKIAJPM664AWNNL6VUYA
// Ih2iHd5/4+qeCanTAe3gylOe7Ok/ccwkmiguPTkK

// If user doesn't have permissions to edit options deny them access
if (! current_user_can('manage_options'))
{
	exit();
}

// Array of options fields
$settings = ['abuBucketName', 'abuBucketRegion', 'abuAccessKeyId', 'abuSecretAccessKey'];

// Loop through the array
for ($i = 0; $i < count($settings); $i++) { 
	// If an option is set, assign it to a variable
	if (get_option($settings[$i])) {
		$$settings[$i] = get_option($settings[$i]);
	}

	if (isset($_POST[$settings[$i]]) && wp_verify_nonce( $_POST['_wpnonce'])) {
		update_option($settings[$i], $_POST[$settings[$i]]);
	}
}
?>

<div class="wrap">
	<h2>AWS Browser Upload Options</h2>
	
	<form action="" method="post">
		<?php wp_nonce_field(); ?>
		<table class="form-table">
            <tbody>
                <tr>
                	<th scope="row"><label for="abuBucketName">Bucket Name</label></th>
                    <td>
						<input type="text" name="abuBucketName" value="<?php echo $abuBucketName; ?>" id="abuBucketName" class="regular-text"/>
						<p class="description">The name of your bucket exactly as it appears on AWS S3</p>
					</td>
				</tr>
				<tr>
                	<th scope="row"><label for="abuBucketRegion">Bucket Region</label></th>
                    <td>
						<input type="text" name="abuBucketRegion" value="<?php echo $abuBucketRegion; ?>" id="abuBucketRegion" class="regular-text"/>
						<p class="description">The region of your bucket e.g. "eu-west-1"</p>
					</td>
				</tr>
				<tr>
                	<th scope="row"><label for="abuAccessKeyId">Access Key ID</label></th>
                    <td>
						<input type="text" name="abuAccessKeyId" value="<?php echo $abuAccessKeyId; ?>" id="abuAccessKeyId" class="regular-text"/>
					</td>
				</tr>
				<tr>
                	<th scope="row"><label for="abuSecretAccessKey">Access Key Secret</label></th>
                    <td>
						<input type="text" name="abuSecretAccessKey" value="<?php echo $abuSecretAccessKey; ?>" id="abuSecretAccessKey" class="regular-text"/>
					</td>
				</tr>
				<tr>
					<th scope="row"></th>
					<td>
						<p class="submit"><input type="submit" value="Save Settings" class="button button-primary"></p>
					</td>
				</tr>
			</tbody>
		</table>
	</form>
</div>