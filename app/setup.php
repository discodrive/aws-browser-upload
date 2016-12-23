<?php
add_action('admin_menu', 'abu_admin_menu');

// Enqueue Javascript to backend
if (! function_exists('abu_enqueue_scripts'))
{
    function abu_enqueue_scripts()
    {
        wp_enqueue_script('sdk', '/wp-content/plugins/aws-browser-upload/assets/js/sdk.js', array('jquery'));
        wp_enqueue_script('aws-sdk', 'https://sdk.amazonaws.com/js/aws-sdk-2.6.10.min.js');
        wp_enqueue_script('clipboard', '/wp-content/plugins/aws-browser-upload/vendor/clipboard/dist/clipboard.min.js');
        wp_enqueue_style('abu-styles', '/wp-content/plugins/aws-browser-upload/assets/css/abu.css');
        wp_enqueue_style('font-awesome', '/wp-content/plugins/aws-browser-upload/assets/font-awesome/css/font-awesome.min.css');

        // Make contants available in sdk.js
        wp_localize_script('sdk', 'abu_options', array(
        	'bucketName'   => ABU_BUCKET_NAME,
        	'bucketRegion' => ABU_BUCKET_REGION,
        	'accessKey'    => ABU_ACCESS_KEY,
        	'secretKey'    => ABU_SECRET_ACCESS_KEY
        ));
    }
    add_action('admin_enqueue_scripts', 'abu_enqueue_scripts');
}
