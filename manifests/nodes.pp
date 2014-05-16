node base {
    # Set path of the exec
    Exec {
        path => [ "/bin/", "/sbin/" , "/usr/bin/", "/usr/sbin/" ]
    }

    # Install ntp
    #include 'ntp'

    # Configure locales
    #class { 'locales':
    #    autoupgrade     => true,
    #    default_locale  => 'en_US.UTF-8',
    #    locales         => [
    #        'en_US.UTF-8 UTF-8',
    #    ],
    #}

    # Install the server
    include 'zoo-bot-server'

}

node default inherits base {}
