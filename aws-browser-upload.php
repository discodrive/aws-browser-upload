<?php
/*
Plugin Name: AWS Browser Upload
Plugin URI: http://substrakt.com
Author:      Substrakt
Author URI:  http://substrakt.com
Description: Upload files to an Amazon Web Services bucket from the WordPress backend
Version: 0.1
*/

define('ABU_PATH', __DIR__);
define('ABU_BUCKET_NAME', get_option('abuBucketName'));
define('ABU_BUCKET_REGION', get_option('abuBucketRegion'));
define('ABU_ACCESS_KEY', get_option('abuAccessKeyId'));
define('ABU_SECRET_ACCESS_KEY', get_option('abuSecretAccessKey'));

require __DIR__ . '/admin/actions.php';
require __DIR__ . '/app/setup.php';
