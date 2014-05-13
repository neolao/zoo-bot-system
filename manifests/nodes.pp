node base {
    # Install ntp
    include '::ntp'

    # Configure locals
    class { 'locales':
        autoupgrade     => true,
        default_locale  => 'en_US.UTF-8',
        locales         => [
            'en_US.UTF-8 UTF-8',
        ],
    }

    # Install some tools
    package { ['wget', 'curl', 'tar', 'sudo', ]:
        ensure => present,
    }

    # Install the server
    include 'zoo-bot-server'

}

node default inherits base {}
