class nodejs {
    # Download nodejs
    archive { 'node-v0.11.12':
        ensure => present,
        url    => 'http://nodejs.org/dist/v0.11.12/node-v0.11.12-linux-arm-pi.tar.gz',
        follow_redirects => true,
        target => '/opt',
        checksum => false,
        src_target => '/tmp'
    }
}
