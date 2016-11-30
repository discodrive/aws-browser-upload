<?php
add_action('admin_menu', 'abu_admin_menu');

if(! function_exists('abu_theme_enqueue_scripts')) {
    function abu_theme_enqueue_scripts() {
        wp_register_script('sdk', '/wp-content/plugins/aws-browser-upload/assets/js/sdk.js', array('jquery'));
        wp_enqueue_script('sdk');
        wp_register_script('aws-sdk', 'https://sdk.amazonaws.com/js/aws-sdk-2.6.10.min.js');
        wp_enqueue_script('aws-sdk');
    }
    add_action('admin_enqueue_scripts', 'abu_theme_enqueue_scripts');
}


