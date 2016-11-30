<?php

if (! function_exists('abu_admin_menu')) {
    function abu_admin_menu() {
        add_options_page('AWS Browser Upload', 'AWS Browser Upload', 'manage_options', 'aws-browser-upload', 'abu_options');
    }
}

if (! function_exists('abu_options')) {
    function abu_options() {
        if (! current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.'));
        }
        include ABU_PATH . '/admin/file-upload.php';
    }
}
