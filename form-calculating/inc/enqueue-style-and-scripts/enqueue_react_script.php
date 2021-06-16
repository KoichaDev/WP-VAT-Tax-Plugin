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
        $file_version = round(microtime(true), 0);

        // Load regular JavaScript with the React 
        wp_enqueue_script('react-script', $file_to_js, [], $file_version, false);
    }


    // wp_enqueue_script('react', get_template_directory_uri() . '/dist/index.js', ['jquery'], filemtime(get_stylesheet_directory() . '/dist/index.js'), false);
}

add_filter('script_loader_tag', 'script_defer', 10);
add_action('admin_enqueue_scripts', 'enqueue_react_script');
