<?php

if (!function_exists('gs_enqueue_script_and_styles')) {

    function gs_enqueue_script_and_styles() {
        if (basename($_SERVER['REQUEST_URI']) === 'admin.php?page=calculate_tax_vat') {
            $file_to_js = dirname(plugin_dir_url(__DIR__), 2) . '/frontend/dist/index.js';
            $file_to_css = dirname(plugin_dir_url(__DIR__), 2) . '/frontend/dist/index.css';

            $file_version = round(microtime(true), 0);

            // Load regular JavaScript with the React 
            wp_enqueue_style('style-sheet', $file_to_css, [], $file_version, 'all');
            wp_enqueue_script('react-script', $file_to_js, [], $file_version, false);

            wp_localize_script('react-script', 'gsReactScript', [
                'url' => get_site_url(), // Returns the URL of the current WP installation address
                'nonce' => wp_create_nonce('wp_rest') // WP will give user ID to check if the user is logged in or not, so we can perform safe CRUD operation
            ]);
        }
    }

    add_action('admin_enqueue_scripts', 'gs_enqueue_script_and_styles');
}
