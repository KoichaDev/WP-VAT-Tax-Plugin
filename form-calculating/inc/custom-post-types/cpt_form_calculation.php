<?php

function cpt_form_calculation() {

    $labels = [
        "name" => __("Form calculation", "godt-sagt"),
        'all_items' => __('All Posts'),
        "singular_name" => __("Form calculation", "godt-sagt"),
    ];

    $args = [
        "label" => __("cpt_form_calculation", "godt-sagt"),
        "labels" => $labels,
        "description" => "",
        "public" => true,
        "publicly_queryable" => true,
        "show_ui" => true,
        "show_in_rest" => false,
        "rest_base" => "",
        "rest_controller_class" => "WP_REST_Posts_Controller",
        "has_archive" => true,
        "show_in_menu" => true,
        "show_in_nav_menus" => true,
        "delete_with_user" => false,
        "exclude_from_search" => false,
        "capability_type" => "post",
        "map_meta_cap" => true,
        "hierarchical" => true,
        "rewrite" => [
            "slug" => "ntb-automation",
            "with_front" => true
        ],
        "query_var" => true,
        "menu_position" => 5,
        "supports" => ["title"],
    ];

    register_post_type("cpt-form-calculation", $args);
}

add_action('init', 'cpt_form_calculation');
