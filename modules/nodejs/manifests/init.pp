class nodejs {
    # Requirement
    package { ['test', 'wget', 'tar']:
        ensure => present,
    }

    # Download nodejs
    exec { 'Download nodejs archive':
        command => 'wget -O /tmp/node-v0.11.6.tar.gz http://nodejs.org/dist/v0.11.6/node-v0.11.6-linux-arm-pi.tar.gz',
        onlyif  => 'test ! -e /tmp/node-v0.11.6.tar.gz'
    }
}
