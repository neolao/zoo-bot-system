node base {
    # Install ntp
    include '::ntp'

    # Configure locales
    class { 'locales':
        autoupgrade     => true,
        default_locale  => 'en_US.UTF-8',
        locales         => [
            'en_US.UTF-8 UTF-8',
        ],
    }

    # Install some tools
    package { ['wget', 'curl', 'tar', 'sudo', 'tmux', ]:
        ensure => present,
    }

    # Install nodejs
    include 'nodejs'

    # Install the server
    include 'zoo-bot-server'

}

node default inherits base {}
