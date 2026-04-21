<?php

it('allows midtrans notification webhook without csrf token', function () {
    $response = $this->postJson('/midtrans/notification', []);

    expect($response->status())->not->toBe(419);
});
