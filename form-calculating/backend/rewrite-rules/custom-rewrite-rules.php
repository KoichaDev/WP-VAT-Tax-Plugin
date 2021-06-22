<?php
// ! This is to automatic flushing for the WordPress rewrite rules
// ! Ideally, this is not optimal to do it, since it's an expensive operation so it should only be used when necessary.
// ! but this is a testing assignment purpose, so I just want to ensure that the CPT is actually working without
// ! you have go to settings -> permalinks -> save changes to work 
// ! Source: https://developer.wordpress.org/reference/functions/flush_rewrite_rules/

if (!function_exists('gs_custom_rewrite_rules')) {

    function gs_custom_rewrite_rules() {
        flush_rewrite_rules();
    }
    add_action('init', 'gs_custom_rewrite_rules');
}
