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

require __DIR__ . '/admin/actions.php';
require __DIR__ . '/app/setup.php';
