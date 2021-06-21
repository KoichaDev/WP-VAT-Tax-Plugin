<?php
// ! This is to automatic flushing of the WordPress rewrite rules
// ! Ideally, this is not optimal to do it, since it's an expensive operation so it should only be used when necessary.
// ! Since this is a testing assignment purpose, I just to ensure that the CPT is actually working without
// ! you have go to settings -> permalinks -> save changes in order to let the CPT work
// ! Source: https://developer.wordpress.org/reference/functions/flush_rewrite_rules/

function gs_custom_rewrite_rules() {
    flush_rewrite_rules();
}
add_action('init', 'gs_custom_rewrite_rules');
