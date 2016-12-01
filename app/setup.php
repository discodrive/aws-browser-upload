<?php
add_action('admin_menu', 'abu_admin_menu');


// Enqueue Javascript to backend
if (! function_exists('abu_enqueue_scripts')) {
    function abu_enqueue_scripts() {
        wp_register_script('sdk', '/wp-content/plugins/aws-browser-upload/assets/js/sdk.js', array('jquery'));
        wp_register_script('aws-sdk', 'https://sdk.amazonaws.com/js/aws-sdk-2.6.10.min.js');

        wp_enqueue_script('sdk');
        wp_enqueue_script('aws-sdk');
    }
    add_action('admin_enqueue_scripts', 'abu_enqueue_scripts');
}

// Enqueue Stylesheets to backend
if (! function_exists('abu_enqueue_styles')) {
    function abu_enqueue_styles() {
        wp_register_style('abu-styles', '/wp-content/plugins/aws-browser-upload/assets/css/abu.css');

        wp_enqueue_style('abu-styles');
    }
    add_action('admin_enqueue_styles', 'abu_enqueue_styles');
}


