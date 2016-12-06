<?php

// if (! function_exists('abu_settings_init')) {
//     function abu_settings_init() {
//         // Register new settings for "abu_options" page
//         register_setting('abuopts', 'abu_options');

//         // Register a new settings section in the abuopts page
//         add_settings_section(
//             'abu_section_developers',
//             __('AWS Browser Upload Settings', 'abuopts'),
//             'abu_section_developers_cb',
//             'abu'
//         );

//         // Register a field in the 'abu_section_developers' section of the abutopts page
//         add_settings_field(
//             'test_field_one',
//             __('Test Field Number 1', 'abuopts'),
//             'abu_section_developers_cb',
//             'abuopts',
//             'abu_section_developers',
//             [
//                 'label_for'           => 'abuopts_field_pill',
//                 'class'               => 'abuopts_row',
//                 'abuopts_custom_data' => 'custom',
//             ]
//         );
//     }
// }

// // Register out abuopts_settings_init
// add_action('admin_init', 'abu_settings_init');

if (! function_exists('abu_admin_menu')) {
    function abu_admin_menu() {
        // Add top level menu item
        add_menu_page('AWS Browser Upload', 'AWS Browser Upload', 'manage_options', 'aws-browser-upload', 'abu_upload');

        // Add submenu item
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
