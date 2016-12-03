<?php

if (! function_exists('abu_admin_menu')) {
    function abu_admin_menu() {
        add_menu_page('AWS Browser Upload', 'AWS Browser Upload', 'manage_options', 'aws-browser-upload', 'abu_upload');

        add_submenu_page('aws-browser-upload', 'AWS Browser Upload Options', 'Options', 'manage_options', 'aws-browser-upload-options', 'abu_options');
    }
}

if (! function_exists('abu_upload')) {
    function abu_upload() {
        if (! current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.'));
        }
        include ABU_PATH . '/admin/file-upload.php';
    }
}

if (! function_exists('abu_options')) {
    function abu_options() {
        if (! current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.'));
        }
        include ABU_PATH . '/admin/options.php';
    }
}
