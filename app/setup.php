<?php
add_action('admin_menu', 'abu_admin_menu');

// Enqueue Javascript to backend
if (! function_exists('abu_enqueue_scripts')) {
    function abu_enqueue_scripts() {
        wp_enqueue_script('sdk', '/wp-content/plugins/aws-browser-upload/assets/js/sdk.js', array('jquery'));
        wp_enqueue_script('aws-sdk', 'https://sdk.amazonaws.com/js/aws-sdk-2.6.10.min.js');
        wp_enqueue_script('clipboard', '/wp-content/plugins/aws-browser-upload/vendor/clipboard/dist/clipboard.min.js');
        wp_enqueue_style('abu-styles', '/wp-content/plugins/aws-browser-upload/assets/css/abu.css');
    }
    add_action('admin_enqueue_scripts', 'abu_enqueue_scripts');
}


