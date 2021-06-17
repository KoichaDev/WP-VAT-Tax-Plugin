<?php


function script_defer($url) {
    if (is_admin()) {
        return $url; //don't break WP Admin
    }

    if (false === strpos($url, '.js')) {
        return $url;
    }

    if (strpos($url, 'jquery.js')) {
        return $url;
    }
    return str_replace(' src', ' defer src', $url);
}

function enqueue_react_script() {
    if (basename($_SERVER['REQUEST_URI']) === 'admin.php?page=calculate_tax_vat') {
        $file_to_js = dirname(plugin_dir_url(__DIR__), 1) . '/dist/index.js';
        $file_to_css = dirname(plugin_dir_url(__DIR__), 1) . '/dist/index.css';

        $file_version = round(microtime(true), 0);

        // Load regular JavaScript with the React 
        wp_enqueue_style('style-sheet', $file_to_css, [], $file_version, 'all');
        wp_enqueue_script('react-script', $file_to_js, [], $file_version, false);

        wp_localize_script('react-script', 'gsReactScript', [
            'url' => get_site_url(), // Returns the URL of the current WP installation address
            'nonce' => wp_create_nonce('wp_rest') // WP will give user ID to check if the user is logged in or not, so we can perform CRUD operation
        ]);
    }
}

add_filter('script_loader_tag', 'script_defer', 10);
add_action('admin_enqueue_scripts', 'enqueue_react_script');
