<?php

define('GS_FORM_CALCULATING_PLUGIN_DIR_PATH', untrailingslashit(plugin_dir_path(__FILE__)));

function gs_acf_json_save_point($path) {

    // Update path
    $path = GS_FORM_CALCULATING_PLUGIN_DIR_PATH;

    // Return path
    return $path;
}
add_filter('acf/settings/save_json', 'gs_acf_json_save_point');
