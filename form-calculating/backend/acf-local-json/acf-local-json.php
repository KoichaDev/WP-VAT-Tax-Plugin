<?php

define('GS_FORM_CALCULATING_PLUGIN_DIR_PATH', untrailingslashit(plugin_dir_path(__FILE__)));

/**
 * Register the path to save the ACF json files so that they are version controlled.
 * @param $paths The default relative path to the folder where ACF saves the files.
 * @return string The new relative path to the folder where we are saving the files.
 */

function gs_acf_json_save_point($path) {

    // Retrievev the updated path where ACF is going to be saved
    $path = GS_FORM_CALCULATING_PLUGIN_DIR_PATH;

    // Return path
    return $path;
}
add_filter('acf/settings/save_json', 'gs_acf_json_save_point');



/**
 * Register the path to load the ACF json files so that they are version controlled.
 * @param $paths The default relative path to the folder where ACF loading the files.
 * @return string The new relative path to the folder where we are saving the files.
 */

function gs_acf_json_load_point($paths) {
    // Remove original path
    unset($paths[0]); // Append our new path
    $paths[] = GS_FORM_CALCULATING_PLUGIN_DIR_PATH;
    return $paths;
}

add_filter('acf/settings/load_json', 'gs_acf_json_load_point');
